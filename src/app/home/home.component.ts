import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WeatherLocation } from '../models/weather.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <div>
      <a
        *ngFor="let location of weatherLocations"
        [routerLink]="['/weather', location.id]"
      >
        {{ location.name }} Forecast
      </a>
    </div>
  `,
})
export class HomeComponent {
  weatherLocations: WeatherLocation[] = [
    { id: 'TOP', name: 'Kansas' },
    { id: 'LWX', name: 'District of Columbia' },
  ];
}
