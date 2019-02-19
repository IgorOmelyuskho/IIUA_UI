import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../auth/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  isAuthorized = false;

  constructor(private authService: AuthorizationService) {
    // authService.userIsAuthorized().subscribe(
    //   isAuth => {
    //     this.isAuthorized = isAuth;
    //   },
    //   err => {
    //     this.isAuthorized = false;
    //   }
    // );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.isAuthorized === true) {
    //   return false;
    // } else {
    //   return true;
    // }
    return true;
  }
}
