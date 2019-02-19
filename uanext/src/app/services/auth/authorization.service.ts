import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap, delay } from 'rxjs/operators';
import { Observable, of, merge, combineLatest } from 'rxjs';

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
    console.log('INIT IN APP');
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
        vendor => {
          this.stateService.user$.next(vendor);
          this.stateService.authorized$.next(true);
          if (this.router.url === '' || this.router.url === '/') {
            this.router.navigate(['home', 'vendor']);
          }
        },
        err => {
          console.warn(err);
          this.signOut();
        }
      );
    }

    if (role === 'Investor') {
      this.profileService.fetchInvestor().subscribe(
        investor => {
          this.stateService.user$.next(investor);
          this.stateService.authorized$.next(true);
          if (this.router.url === '' || this.router.url === '/') {
            this.router.navigate(['home', 'investor']);
          }
        },
        err => {
          console.warn(err);
          this.signOut();
        }
      );
    }
  }

  // any because api return empty or {"message": "User Email \"string4@gmail.com\" is already taken"}
  signUpAsVendor(vendorDto: VendorDto): Observable<any> {
    return this.http.post<any>(`${environment.api_url}api/Vendor/register`, vendorDto, /* httpOptions */{ observe: 'response' });
  }

  signUpAsInvestor(investorDto: InvestorDto): Observable<any> {
    return this.http.post<any>(`${environment.api_url}api/Investor/register`, investorDto, { observe: 'response' });
  }

  // any because api return different response
  signIn(investorOrVendor: { password: string, email: string }): Observable<any> {
    return this.http.post<any>(`${environment.api_url}api/Auth/authenticate`, investorOrVendor, { observe: 'response' });
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.stateService.user$.next(null);
    this.stateService.authorized$.next(false);
    this.router.navigate(['']);
  }

  userIsAuthorized(): Observable<boolean> {
    // return of(true).pipe(
    //   delay(1000)
    // );
    return combineLatest(
      this.stateService.authorized$.asObservable(),
      this.stateService.user$.asObservable(),
      (authorized, user) => {
        if (authorized === true && user != null) {
          console.log('userIsAuthorized = TRUE');
          return true;
        } else {
          console.log('userIsAuthorized = FALSE');
          return false;
        }
      }
    );
  }
  // userIsAuthorized(): boolean {
  //   if (this.stateService.authorized$.getValue() === true && this.stateService.user$.getValue() !== null) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

}


