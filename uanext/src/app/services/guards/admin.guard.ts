import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../http/authorization.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRole } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  helper = new JwtHelperService();

  constructor(private authService: AuthorizationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // todo uncomment
    // if (this.authService.userIsAuthorized() === false) {
    //   return false;
    // }

    // const token = localStorage.getItem('token');
    // let decodedToken: any;

    // if (token == null || token === '') {
    //   return false;
    // }

    // try {
    //   decodedToken = this.helper.decodeToken(token);
    // } catch {
    //   return false;
    // }

    // if (decodedToken.role !== UserRole.Admin) {
    //   return false;
    // }

    return true;
  }
}
