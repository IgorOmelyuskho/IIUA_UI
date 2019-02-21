import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

import { BehaviorSubject, } from 'rxjs';

import { VendorRole } from './../../models';
import { InvestorRole } from './../../models';
import { NotificationService } from '../notification/notification.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  private helper = new JwtHelperService();
  user$: BehaviorSubject<VendorRole | InvestorRole> = new BehaviorSubject(null);
  authorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private notify: NotificationService, private router: Router) { }

  // duplicate AuthorizationService method because circular dependency
  signOut(): void {
    localStorage.removeItem('token');
    this.user$.next(null);
    this.authorized$.next(false);
    this.router.navigate(['signin']);
  }

  /**
  * must call after localStorage.setItem(token)
  */
  role(): string {
    try {
      const token = localStorage.getItem('token');
      const decodedToken: any = this.helper.decodeToken(token);
      return decodedToken.role;
    } catch {
      this.signOut();
      this.notify.show('Some problem with token');
    }
  }

  /**
  * must call after localStorage.setItem(token)
  */
  userId(): string {
    try {
      const token = localStorage.getItem('token');
      const decodedToken: any = this.helper.decodeToken(token);
      return decodedToken.unique_name;
    } catch {
      this.signOut();
      this.notify.show('Some problem with token');
    }
  }
}
