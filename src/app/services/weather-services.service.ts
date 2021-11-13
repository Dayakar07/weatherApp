import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, finalize, retry, retryWhen, take } from 'rxjs/operators';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=60b37e35a5a4ae5e8112681937fd7055&q=';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * we can do error handling using pipe and throw custom obervable 
   * when error occurs so that fork join will not be failed because of error in 
   * single http call
   * 
   * @param cityName 
   * @returns observable
   */
  getWeatherForCity(cityName) {
    const path = BASE_URL + cityName + '&units=metric'
    return this.http.get(path).pipe(
      retry(3)
      // retryWhen(error =>
      //   error.pipe(delay(1000),
      //     take(3)
      //   )
      // )
    );
  }
}
