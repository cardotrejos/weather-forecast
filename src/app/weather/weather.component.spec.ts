import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
import { WeatherService } from '../services/weather.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { mockedResponse } from '../utils/mocked-response';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;
  let activatedRouteSpy: ActivatedRoute;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    const weatherServiceMock = jasmine.createSpyObj('WeatherService', [
      'getForecast',
    ]);
    activatedRouteSpy = {
      params: of({ locationId: 'TOP' }),
    } as any;

    await TestBed.configureTestingModule({
      imports: [WeatherComponent, HttpClientTestingModule],
      providers: [
        { provide: WeatherService, useValue: weatherServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);

    weatherServiceSpy = TestBed.inject(
      WeatherService
    ) as jasmine.SpyObj<WeatherService>;
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch forecast data on initialization', (done) => {
    weatherServiceSpy.getForecast.and.returnValue(of(mockedResponse));

    fixture.detectChanges();

    component.forecastData$!.subscribe((data) => {
      expect(data).toEqual(mockedResponse);
      done();
    });
  });
});
