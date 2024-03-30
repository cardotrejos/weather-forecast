import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherForecastResponse } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly baseUrl = 'https://api.weather.gov/gridpoints';

  constructor(private http: HttpClient) {}

  getForecast(locationId: string): Observable<WeatherForecastResponse> {
    const url = `${this.baseUrl}/${locationId}/31,80/forecast`;
    return this.http.get<WeatherForecastResponse>(url);
  }
}
