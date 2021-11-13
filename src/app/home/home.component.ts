import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { WeatherService } from '../services/weather-services.service';
import { CITIES, ERROR_MESSAGES } from '../shared/weather.constants';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public cities: any[];
  loading: boolean = false;

  constructor(private wService: WeatherService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loading = true;
    this.getWeatherForCities();
  }

  /**
   * convert each city item to observable and subscribe to the observable 
   * collection using forkjoin to get all at once
   */
  getWeatherForCities() {
    const citiesArr$ = CITIES.map(cityName => this.wService.getWeatherForCity(cityName));
    forkJoin(citiesArr$).subscribe(
      (response) => {
        this.cities = response;
        this.openSnackBar('Loaded!', 5000);
      },
      (err) => {
        this.loading = false;
        this.openSnackBar((err.message || ERROR_MESSAGES.failure), 10000);
      },
      () => {
        this.loading = false;
      }
    );
  }

  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, '', { duration });
  }

}
