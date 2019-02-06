import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthorizationService } from './../auth/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class InvestorGuard implements CanActivate {
  helper = new JwtHelperService();

  constructor(private authService: AuthorizationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      // TODO
    // if (this.authService.userIsAuthorized() === false) {
    //   return false;
    // }

    // const token = localStorage.getItem('token');
    // let decodedToken: any;
    // let isExpired: boolean;

    // if (token == null || token === '') {
    //   return false;
    // }

    // try {
    //   decodedToken = this.helper.decodeToken(token);
    //   isExpired = this.helper.isTokenExpired(token);
    // } catch {
    //   return false;
    // }

    // if (isExpired === true || decodedToken.role !== 'Investor') {
    //   return false;
    // }

    return true;
  }
}
