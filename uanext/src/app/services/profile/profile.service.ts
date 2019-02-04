import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  // I dont know what return api
  // fetchUser call only in init() or maybe in another method? We need this method in this service?
  fetchUser(): Observable<any> {
    return this.http.post<any>(`${environment.api_url}api/User`, {}, { observe: 'response' });
  }

  // fetchInvestor(): Observable<any> {
  // }

  // fetchVendor(): Observable<any> {
  // }
}
