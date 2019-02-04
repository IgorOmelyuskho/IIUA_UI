import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthorizationService } from './../auth/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class VendorGuard implements CanActivate {
  helper = new JwtHelperService();

  constructor(private authService: AuthorizationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.userIsAuthorized() === false) {
      return false;
    }

    const token = localStorage.getItem('token');

    try {
      const decodedToken: any = this.helper.decodeToken(token);
      const isExpired: boolean = this.helper.isTokenExpired(token);

      if (isExpired === true || decodedToken.role !== 'Vendor') {
        return false;
      }
    } catch {
      return false;
    }

    return true;
  }
}
