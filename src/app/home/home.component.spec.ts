import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatCardModule, MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { WeatherService } from '../services/weather-services.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: WeatherService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, MatSnackBarModule, MatProgressSpinnerModule, HttpClientModule, BrowserAnimationsModule],
      declarations: [HomeComponent],
      providers: [{ provide: WeatherService, useValue: { getWeatherForCity: () => of() } }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.get(WeatherService);
    component.cities = [{ "coord": { "lon": -0.1257, "lat": 51.5085 }, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "base": "stations", "main": { "temp": 11.61, "feels_like": 11.02, "temp_min": 10.72, "temp_max": 12.37, "pressure": 1016, "humidity": 84 }, "visibility": 10000, "wind": { "speed": 5.66, "deg": 300 }, "clouds": { "all": 90 }, "dt": 1636794701, "sys": { "type": 2, "id": 2019646, "country": "GB", "sunrise": 1636787720, "sunset": 1636820067 }, "timezone": 0, "id": 2643743, "name": "London", "cod": 200 }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // use fakeasync for async tasks
  it('should call wether servce on init', () => {
    const serviceSpy = spyOn(service, 'getWeatherForCity');
    component.ngOnInit();
    expect(serviceSpy).toHaveBeenCalled();
  });

  it('should have mat card', () => {
    const cardEle = fixture.debugElement.query(By.css('mat-card'));
    expect(cardEle).toBeTruthy();
  });

  it('card should have header', () => {
    const cardEle = fixture.debugElement.query(By.css('mat-card mat-card-title'));
    expect(cardEle.nativeElement.textContent).toBe('LONDON');
  });

  it('mat card should have subtitle with info', () => {
    const subtitleEle = fixture.debugElement.query(By.css('mat-card mat-card-subtitle'));
    expect(subtitleEle).toBeTruthy();
    const countryEle = fixture.debugElement.query(By.css('mat-card mat-card-subtitle .country'));
    expect(countryEle).toBeTruthy();
    const sunriseEle = fixture.debugElement.query(By.css('mat-card mat-card-subtitle .sunrise'));
    expect(sunriseEle).toBeTruthy();
    const sunsetEle = fixture.debugElement.query(By.css('mat-card mat-card-subtitle .sunset'));
    expect(sunsetEle).toBeTruthy();
    const temperatureEle = fixture.debugElement.query(By.css('mat-card mat-card-subtitle .temperature'));
    expect(temperatureEle).toBeTruthy();
  });

  it('card should have content', () => {
    const cardEle = fixture.debugElement.query(By.css('mat-card mat-card-content'));
    expect(cardEle.nativeElement.textContent).toBeTruthy();
  });

  it('card content should have description, humidity and feels like', () => {
    const descriptionEle = fixture.debugElement.query(By.css('mat-card mat-card-content .description'));
    expect(descriptionEle.nativeElement.textContent).toBe('Overcast Clouds ');
    const humidEle = fixture.debugElement.query(By.css('mat-card mat-card-content .humidity'));
    expect(humidEle).toBeTruthy();
    const feelsEle = fixture.debugElement.query(By.css('mat-card mat-card-content .feels'));
    expect(feelsEle).toBeTruthy();
  });

});
