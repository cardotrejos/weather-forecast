import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { mockedResponse } from '../utils/mocked-response';
import { WeatherForecastResponse } from '../models/weather.model';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch forecast data', () => {
    const mockForecastData: WeatherForecastResponse = mockedResponse;

    service.getForecast('TOP').subscribe((data) => {
      expect(data).toEqual(mockForecastData);
    });

    const req = httpMock.expectOne(
      'https://api.weather.gov/gridpoints/TOP/31,80/forecast'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockForecastData);
  });
});
