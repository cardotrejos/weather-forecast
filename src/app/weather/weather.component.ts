import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [WeatherService],
})
export class WeatherComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private weatherService = inject(WeatherService);
  chart: Chart | undefined;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.weatherService.getForecast(params['locationId']).subscribe({
        next: (data: any) => {
          const temperatures = data.properties.periods.map(
            (period: any) => period.temperature
          );
          const labels = data.properties.periods.map(
            (period: any) => period.name
          );
          this.createChart(labels, temperatures);
        },
        error: (error) => console.error('Error:', error),
        complete: () => console.log('Completed'),
      });
    });
  }

  createChart(labels: string[], data: number[]) {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('chart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Temperature',
            data: data,
            borderColor: 'blue',
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
