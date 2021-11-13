import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WeatherService } from './weather-services.service';


const expectedRes = { "coord": { "lon": -0.1257, "lat": 51.5085 }, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "base": "stations", "main": { "temp": 11.61, "feels_like": 11.02, "temp_min": 10.72, "temp_max": 12.37, "pressure": 1016, "humidity": 84 }, "visibility": 10000, "wind": { "speed": 5.66, "deg": 300 }, "clouds": { "all": 90 }, "dt": 1636794701, "sys": { "type": 2, "id": 2019646, "country": "GB", "sunrise": 1636787720, "sunset": 1636820067 }, "timezone": 0, "id": 2643743, "name": "London", "cod": 200 };
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=60b37e35a5a4ae5e8112681937fd7055&q=';

describe('WeatherServicesService', () => {
  let httpTestingController: HttpTestingController;
  let service: WeatherService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [WeatherService]
  }));

  beforeEach(() => {
    service = TestBed.get(WeatherService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });

  it('should be created', () => {
    const service: WeatherService = TestBed.get(WeatherService);
    expect(service).toBeTruthy();
  });

  it('should call', () => {
    service.getWeatherForCity('London').subscribe(
      emps => expect(emps).toEqual(expectedRes, 'should return expected employees'),
      fail
    );
    const req = httpTestingController.expectOne(BASE_URL + expectedRes.name + '&units=metric');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedRes); //Return expectedEmps
  })

});
