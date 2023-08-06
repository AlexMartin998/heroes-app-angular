import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import { environments } from 'src/environments/environments';
import { Hero } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(hero: Hero): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${hero}`).pipe(
      // debo retoranr 1 Observable, x eso el of() | podriamos manejarlo de varias formas
      catchError((err) => of(undefined))
    );
  }
}
