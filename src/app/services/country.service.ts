import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Country, CountryName } from "../models/country.model";



@Injectable({ providedIn: 'root' })
export class CountryService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<string[]> {
    return this.http
      .get<Country[]>('https://restcountries.com/v3.1/all?fields=name')
      .pipe(
        map((country: Country[]): string[] =>
          country.map((countryName: Country): string => countryName.name.common).sort()
        )
      );
  }
}