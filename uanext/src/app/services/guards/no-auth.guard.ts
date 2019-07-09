import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../http/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private authService: AuthorizationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // console.log(state.url);
    // if (state.url.includes('signup') || state.url.includes('signin')) {
    //   return false; // todo not render any component when start app with http://localhost:4200/signin or http://localhost:4200/signup
    // }

    return !this.authService.userIsAuthorized();
  }
}
