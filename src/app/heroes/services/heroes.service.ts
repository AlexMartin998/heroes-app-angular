import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

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

  findOne(hero: Hero): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${hero}`).pipe(
      // debo retoranr 1 Observable, x eso el of() | podriamos manejarlo de varias formas
      catchError((err) => of(undefined))
    );
  }

  // // Autocomplete
  getSuggestions(query: string): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`)
      .pipe();
  }

  // // CRUD
  create(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  update(hero: Hero): Observable<Hero> {
    if (!hero.id) throw new Error('Hero ID is required');
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/heroes/${id}`).pipe(
      map((resp) => true), // si fue exitoso retorno 1 true
      catchError((err) => of(false))
    );
  }
}
