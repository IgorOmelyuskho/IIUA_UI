import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthorizationService } from '../http/authorization.service';
import { UserRole } from 'src/app/models';

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
    let decodedToken: any;

    if (token == null || token === '') {
      return false;
    }

    try {
      decodedToken = this.helper.decodeToken(token);
    } catch {
      return false;
    }

    if (decodedToken.role !== UserRole.Vendor) {
      return false;
    }

    return true;
  }
}
