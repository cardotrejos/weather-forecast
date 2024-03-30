import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getForecast(identifier: string) {
    const urls: { [key: string]: string } = {
      TOP: 'https://api.weather.gov/gridpoints/TOP/31,80/forecast',
      LWX: 'https://api.weather.gov/gridpoints/LWX/31,80/forecast',
    };
    return this.http.get(urls[identifier]);
  }
}
