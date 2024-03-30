import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { WeatherForecastPeriod, WeatherLocation } from '../models/weather.model';
import { Observable, switchMap } from 'rxjs';
import { WeatherForecastResponse } from '../models/weather.model';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [RouterModule, HttpClientModule, NgIf, NgFor, AsyncPipe],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [WeatherService],
})
export class WeatherComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart: Chart | undefined;
  isLoading = true;
  forecastData$: Observable<any> | undefined;

  weatherLocations: WeatherLocation[] = [
    { id: 'TOP', name: 'Kansas' },
    { id: 'LWX', name: 'District of Columbia' },
  ];
  locationColors: { [key: string]: string } = {
    TOP: 'blue',
    LWX: 'red',
  };

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.forecastData$ = this.route.params.pipe(
      switchMap((params) =>
        this.weatherService.getForecast(params['locationId'])
      )
    );
  }

  ngAfterViewInit() {
    this.forecastData$?.subscribe((data: WeatherForecastResponse) => {
      const temperatures = data.properties.periods.map(
        (period: WeatherForecastPeriod) => period.temperature
      );
      const labels = data.properties.periods.map(
        (period: WeatherForecastPeriod) => period.name
      );
      this.createChart(labels, temperatures);
    });
  }

  createChart(labels: string[], data: number[]) {
    if (this.chart) {
      this.chart.destroy();
    }

    if (this.chartCanvas && this.chartCanvas.nativeElement) {
      const locationId = this.route.snapshot.params['locationId'];
      const color = this.locationColors[locationId] || 'blue';
      this.chart = new Chart(this.chartCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Temperature',
              data: data,
              borderColor: color,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Temperature Forecast',
            },
          },
        },
      });
    }
  }
}
