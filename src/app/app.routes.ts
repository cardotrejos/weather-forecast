import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';

export const routes: Routes = [
  { path: '', redirectTo: '/weather/TOP', pathMatch: 'full' },
  { path: 'weather/:locationId', component: WeatherComponent },
];
