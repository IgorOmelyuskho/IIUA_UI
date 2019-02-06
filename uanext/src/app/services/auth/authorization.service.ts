import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { StateService } from '../state/state.service';
import { environment } from '../../../environments/environment';
import { VendorDto, InvestorDto } from '../../models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
    private http: HttpClient,
    private stateService: StateService,
    private router: Router,
    private profileService: ProfileService) { }

  init() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    let decodedToken: any;
    let isExpired: boolean;
    let role: string;

    if (token == null || token === '') {
      this.signOut();
      return;
    }

    try {
      decodedToken = helper.decodeToken(token);
      isExpired = helper.isTokenExpired(token);
      role = decodedToken.role;
    } catch {
      this.signOut();
      return;
    }

    if (isExpired === true) {
      this.signOut();
      return;
    }

    if (role !== 'Admin' && role !== 'Investor' && role !== 'Vendor') {
      this.signOut();
      return;
    }

    if (role === 'Vendor') {
      this.profileService.fetchVendor().subscribe(
        response => {},
        err => { this.signOut(); }
      );
    }

    if (role === 'Investor') {
      this.profileService.fetchInvestor().subscribe(
        response => {},
        err => { this.signOut(); }
      );
    }
  }

  // any because api return empty or {"message": "User Email \"string4@gmail.com\" is already taken"}
  signUpAsVendor(vendorDto: VendorDto): Observable<any> {
    return this.http.post<any>(`${environment.api_url}api/Vendor/register`, vendorDto, { observe: 'response' });
  }

  signUpAsInvestor(investorDto: InvestorDto): Observable<any> {
    return this.http.post<any>(`${environment.api_url}api/Investor/register`, investorDto, { observe: 'response' });
  }

  // any because api return different response
  signIn(investorOrVendor: {password: string, email: string}): Observable<any> {
    return this.http.post<any>(`${environment.api_url}api/User/authenticate`, investorOrVendor, { observe: 'response' });
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.stateService.user$.next(null);
    this.stateService.authorized$.next(false);
  }

  userIsAuthorized(): boolean {
    if (this.stateService.authorized$.getValue() === true && this.stateService.user$.getValue() !== null) {
      return true;
    } else {
      return false;
    }
  }

}