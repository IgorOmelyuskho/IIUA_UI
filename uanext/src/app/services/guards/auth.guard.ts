import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthorizationService } from '../auth/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private userIsAuthorized = false;

  constructor(private authService: AuthorizationService) {
    this.authService.userIsAuthorized().subscribe(
      (isAuthorized: boolean) => {
        this.userIsAuthorized = isAuthorized;
      },
      err => {
        console.warn(err);
        this.userIsAuthorized = false;
      }
    );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('canActivate = ', this.userIsAuthorized);
    // return this.userIsAuthorized; // todo signi must click 2 times
    // return this.authService.userIsAuthorized();
    return true; // todo
  }
}
