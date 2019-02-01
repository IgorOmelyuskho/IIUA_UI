import { User } from './../models/user';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { UserDto } from '../models/userDto';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private user$: BehaviorSubject<User | null> = new BehaviorSubject(null);
  private authorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  getLocalUser(): User {
    return this.user$.getValue();
  }

  // TODO
  // получаем юзера по токену
  fetchUser(): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/Users/getUser`, {}, {observe: 'response'}).pipe(
      tap(response => {
        this.authResponseHandler(response);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  // Будет ли от сервера приходить ответ что такой юзернейм уже занят или еще чтото?
  signUp(userDto: UserDto): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/Users/register`, userDto, {observe: 'response'}).pipe(
      tap(response => {
        // this.authResponseHandler(response); токен приходит только при signIn
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  // Будет ли от сервера приходить ответ что такого юзернейма нету или неверный пароль?
  signIn(userDto: UserDto): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/Users/authenticate`, userDto, {observe: 'response'}).pipe(
      tap(response => {
        this.authResponseHandler(response);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  signOut(): void {
    localStorage.setItem('token', '');
    this.user$.next(null);
    this.authorized$.next(false);

    // Будет ли signout на сервере или только на клиенте?

    // return this.http.post<any>(`${environment.api_url}/signout`, {}).pipe( // TODO
    //   catchError((error: HttpErrorResponse) => {
    //     return throwError(error);
    //   })
    // );
  }

  private authResponseHandler(response) {
    if (response.status === 200) {
      localStorage.setItem('token', response.body.token);
      this.user$.next(response.body);
      this.authorized$.next(true);
    }
  }

  userIsAuthorized(): boolean {
    if (this.authorized$.getValue() === true && this.user$.getValue() !== null) {
      return true;
    } else {
      return false;
    }
  }

}
