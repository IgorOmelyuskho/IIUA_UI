import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { StateService } from '../state/state.service';
import { environment } from '../../../environments/environment';
import { UserDto } from '../../models';
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

    if (token == null || token === '') {
      this.signOut();
      return;
    }

    try {
      decodedToken = helper.decodeToken(token);
      isExpired = helper.isTokenExpired(token);

      if (isExpired === true) {
        this.signOut();
        return;
      }
    } catch {
      this.signOut();
      return;
    }

    // this.profileService.fetchVendor() ?
    // this.profileService.fetchInvestor() ?
    this.profileService.fetchUser().subscribe(
      response => {
        if (response.status !== 200) {
          this.signOut();
          return;
        }
        this.stateService.user$.next(response.body);
        if (decodedToken.role === 'Vendor') {
          this.router.navigate(['home', 'vendor']);
        } else if (decodedToken.role === 'Investor') {
          this.router.navigate(['home', 'investor']);
        }
      },
      err => {
        this.signOut();
      },
      // ()  => {} complete is necessarily???
    );
  }

  // any because api return empty or {"message": "User Email \"string4@gmail.com\" is already taken"}
  signUp(userDto: UserDto): Observable<any> {
    return this.http.post<any>(`${environment.api_url}api/User/register`, userDto, { observe: 'response' });
  }

  // any because api return different response
  signIn(userDto: UserDto): Observable<any> {
    return this.http.post<any>(`${environment.api_url}api/User/authenticate`, userDto, { observe: 'response' });
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
