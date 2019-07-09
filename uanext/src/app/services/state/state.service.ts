import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

import { BehaviorSubject, } from 'rxjs';

import { VendorRole, AdminRole, UserRole } from './../../models';
import { InvestorRole } from './../../models';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { ProjectUserRole } from 'src/app/models/projectUserRole';
import { VendorProject } from 'src/app/models/vendorProject';
import { AuthService } from 'angularx-social-login';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  private helper = new JwtHelperService();
  user$: BehaviorSubject<VendorRole | InvestorRole | AdminRole | ProjectUserRole> = new BehaviorSubject(null);
  authorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  interactiveInvestmentProject$: BehaviorSubject<VendorProject> = new BehaviorSubject(null);

  constructor(private notify: NotificationService, private router: Router, private socialAuthService: AuthService) { }

  // duplicate AuthorizationService method because circular dependency
  signOut(): void {
    localStorage.removeItem('token');
    this.user$.next(null);
    this.authorized$.next(false);
    this.interactiveInvestmentProject$.next(null);
    this.router.navigate(['']);
    this.socialAuthService.signOut();
  }

  /**
  * must call after localStorage.setItem(token)
  */
  role(): UserRole {
    try {
      const token = localStorage.getItem('token');
      const decodedToken: any = this.helper.decodeToken(token);
      return decodedToken.role;
    } catch {
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
