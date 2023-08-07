import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { uuidv4 } from 'src/app/shared/helpers';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public baseUrl = environments.baseUrl;
  private user?: User; // cuando ini la app es null

  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    return structuredClone(this.user); // deep clone
  }

  login(email: string, password: string): Observable<User> {
    // get xq el auth es fake
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => (this.user = user)),
      tap((user) => localStorage.setItem('token', uuidv4()))
    );
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }

  checkAuth(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');

    // NO es real esta verificacion
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      // cada efecto 2rio haga algo especifico (1 sola cosa)
      tap((user) => (this.user = user)),
      map((user) => !!user?.id), // asegurarse q es un bool true
      catchError((err) => of(false))
    );
  }
}
