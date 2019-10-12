import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

import { BehaviorSubject, ReplaySubject, } from 'rxjs';

import { VendorRole, AdminRole, UserRole } from '../models';
import { InvestorRole } from '../models';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { ProjectUserRole } from 'src/app/models/projectUserRole';
import { VendorProject } from 'src/app/models/vendorProject';
import { AuthService } from 'angularx-social-login';
import { Object3DAndProject } from 'src/app/components/threejs-scene/threejs-scene.component';
import { IShowUnreadMessages } from 'src/app/models/chat/unreadMessage';
import { Chat } from '../models/chat/chat';
import { Message } from '../models/chat/message';

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

  // chat
  setCloseAllCardsMenu$: BehaviorSubject<boolean> = new BehaviorSubject(null);
  showUnreadMessages$: ReplaySubject<IShowUnreadMessages> = new ReplaySubject(1);
  unreadChatsCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  blockedOrUnblockedChat$: ReplaySubject<Chat> = new ReplaySubject(null);
  selectedProjectForChat$: BehaviorSubject<VendorProject> = new BehaviorSubject(null);
  displayedChats: Chat[]; // not all chats - only displayed

  // map drag and drop
  object3DAndProject: Object3DAndProject;
  dragStarted = false;
  showProgressWhenDropObject$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private notify: NotificationService, private router: Router, private socialAuthService: AuthService) { }

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

  markChatAsUnread(chatId: string) {
    this.showUnreadMessages$.next({ chatId, isUnread: true });
    this.unreadChatsCount$.next(this.unreadChatsCount$.getValue() + 1);
  }

  markChatAsRead(chatId: string) {
    this.showUnreadMessages$.next({ chatId, isUnread: false });
    this.unreadChatsCount$.next(this.unreadChatsCount$.getValue() - 1);
  }
}
