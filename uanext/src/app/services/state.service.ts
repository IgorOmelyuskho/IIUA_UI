import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

import { BehaviorSubject, ReplaySubject, } from 'rxjs';

import { VendorRole, AdminRole, UserRole } from '../models';
import { InvestorRole } from '../models';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { ProjectUserRole } from 'src/app/models/projectUserRole';
import { VendorProject } from 'src/app/models/vendorProject';
import { AuthService } from 'angularx-social-login';
import { Object3DAndProject } from 'src/app/components/threejs-scene/threejs-scene.component';
import { IShowUnreadMessages } from 'src/app/models/chat/unreadMessage';
import { Chat } from '../models/chat/chat';
import { Message } from '../models/chat/message';
import { ChatService } from './http/chat.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private helper = new JwtHelperService();
  user$: BehaviorSubject<VendorRole | InvestorRole | AdminRole | ProjectUserRole> = new BehaviorSubject(null);
  authorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  interactiveInvestmentProject$: BehaviorSubject<VendorProject> = new BehaviorSubject(null);
  selectedVendorProject$: BehaviorSubject<VendorProject> = new BehaviorSubject(null);
  cardClickEnabled = true;

  // map drag and drop
  object3DAndProject: Object3DAndProject;
  dragStarted = false;
  showProgressWhenDropObject$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private notify: ToastService, private router: Router, private socialAuthService: AuthService) { }

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

  // getId(): string {
  //   return this.user$.value.id;
  // }

  getUserId(): string {
    return this.user$.value.userId;
  }
}
