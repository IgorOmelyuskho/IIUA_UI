import { tap, catchError, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { VendorRole } from '../models/vendorRole';
import { InvestorRole } from './../models/investorRole';
import { UserDto } from './../models/userDto';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // как мне узнать profile$  это VendorRole или InvestorRole? смотреть по полям?

  // profile$: BehaviorSubject<VendorRole | InvestorRole> = new BehaviorSubject(null);
  // profile$ будет использоваться только в одном компоненте?, поэтому в сервисе можна ничего не хранить

  constructor(private http: HttpClient) { }

    getProfile(user: any): Observable<VendorRole | InvestorRole> {
      return this.http.post<any>(`${environment.api_url}/Users/getProfile`, user).pipe(
        map(response => response.body)
      );
    }

    updateProfile(newProfile: VendorRole | InvestorRole): Observable<any> {
      return this.http.post<any>(`${environment.api_url}/Users/updateProfile`, newProfile);
    }
}
