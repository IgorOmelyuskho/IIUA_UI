import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { StateService } from '../state/state.service';
import { environment } from '../../../environments/environment';
import { VendorDto, InvestorDto, UserRole } from '../../models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProfileService } from '../profile/profile.service';
import { AdminDto } from 'src/app/models/adminDto';

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

    if (role !== UserRole.Admin && role !== UserRole.Investor && role !== UserRole.Vendor) {
      this.signOut();
      return;
    }

    const pathName = window.location.pathname.slice();

    if (role === UserRole.Vendor) {
      this.profileService.fetchVendor().subscribe(
        vendor => {
          this.stateService.user$.next(vendor);
          this.stateService.authorized$.next(true);
          if (pathName === '' || pathName === '/') {
            this.router.navigate(['home', 'vendor']);
          } else {
            this.router.navigateByUrl(pathName);
          }
        },
        err => {
          console.warn(err);
          this.signOut();
        }
      );
    }

    if (role === UserRole.Investor) {
      this.profileService.fetchInvestor().subscribe(
        investor => {
          this.stateService.user$.next(investor);
          this.stateService.authorized$.next(true);
          if (pathName === '' || pathName === '/') {
            this.router.navigate(['home', 'investor']);
          } else {
            this.router.navigateByUrl(pathName);
          }
        },
        err => {
          console.warn(err);
          this.signOut();
        }
      );
    }

    if (role === UserRole.Admin) {
      this.profileService.fetchAdmin().subscribe(
        admin => {
          this.stateService.user$.next(admin);
          this.stateService.authorized$.next(true);
          if (pathName === '' || pathName === '/') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigateByUrl(pathName);
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
    return this.http.post<any>(environment.auth + environment.vendorRegister, vendorDto, /* httpOptions */{ observe: 'response' });
  }

  signUpAsInvestor(investorDto: InvestorDto): Observable<any> {
    return this.http.post<any>(environment.auth + environment.investorRegister, investorDto, { observe: 'response' });
  }

  signUpAsAdmin(adminDto: AdminDto): Observable<any> { // todo
    // return of({});
    return this.http.post<any>(environment.auth + environment.adminRegister, adminDto, { observe: 'response' });
  }

  // any because api return different response
  signIn(investorOrVendor: { password: string, email: string }): Observable<any> {
    return this.http.post<any>(environment.auth + environment.authenticate, investorOrVendor, { observe: 'response' });
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.stateService.user$.next(null);
    this.stateService.authorized$.next(false);
    this.router.navigate(['signin']);
  }

  userIsAuthorized(): boolean {
    if (this.stateService.authorized$.getValue() === true && this.stateService.user$.getValue() !== null) {
      return true;
    } else {
      return false;
    }
  }
}


