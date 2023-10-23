import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

type Country = {
  name: {
    common: string;
  };
  currencies: string[];
  capital: string;
  region: string;
};
@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}
  getContries(): any {
    return this.http.get('https://restcountries.com/v3.1/all');
  }
}
