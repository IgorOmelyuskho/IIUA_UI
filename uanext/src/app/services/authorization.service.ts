import { User } from './../models/user';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { AuthCredentials } from '../models/authCredentials';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private user: BehaviorSubject<User | null> = new BehaviorSubject(null);
  private authorized: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  signUp(credentials: AuthCredentials): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/signup`, credentials).pipe(
      tap(response => {
        this.authResponseHandler(response);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  signIn(credentials: AuthCredentials): Observable<any> {
    return this.http.post<any>(`${environment.api_url}/signin`, credentials).pipe(
      tap(response => {
        this.authResponseHandler(response);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  signOut() {
    // localstorge delete token or set ''
    // this.user.next(null);
    // this.authorized.next(false);
    return this.http.post<any>(`${environment.api_url}/signout`, {}).pipe( // TODO
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  authResponseHandler(response) {
    if (response.success && response.token && response.user) {
      localStorage.setItem('token', response.token);
      this.user.next(response.user);
      this.authorized.next(true);
    }
  }

  userIsAuthorized(): boolean {
    if (this.authorized.getValue() === true && this.user.getValue() !== null) {
      return true;
    } else {
      return false;
    }
  }

}
