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

  constructor(private http: HttpClient) { }

  signUp(credentials: AuthCredentials): Observable<any> {
    return this.http.post<any>(`${ environment.api_url }/signup`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  signIn(credentials: AuthCredentials): Observable<any> {
    return this.http.post<any>(`${ environment.api_url }/signin`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  signOut() {
    // localstorge delete token
    return this.http.post<any>(`${ environment.api_url }/signout`, {}).pipe( // TODO
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }


}
