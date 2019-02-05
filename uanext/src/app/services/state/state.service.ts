import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { VendorRole } from './../../models';
import { InvestorRole } from './../../models';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private helper = new JwtHelperService();

  user$: BehaviorSubject<VendorRole | InvestorRole> = new BehaviorSubject(null);
  authorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  role(): string {
    const token = localStorage.getItem('token');
    const decodedToken: any = this.helper.decodeToken(token);
    return decodedToken.role;
  }
}
