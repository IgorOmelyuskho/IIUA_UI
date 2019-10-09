import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { StateService } from 'src/app/services/state.service';
import { ChatType } from 'src/app/models/chat/chatType';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/http/chat.service';
import { delay } from 'rxjs/operators';
import { Chat } from 'src/app/models/chat/chat';
import { IShowUnreadMessages } from 'src/app/models/chat/unreadMessage';

@Component({
  selector: 'app-vendor-project-min-card',
  templateUrl: './vendor-project-min-card.component.html',
  styleUrls: ['./vendor-project-min-card.component.scss']
})
export class VendorProjectMinCardComponent implements OnInit, OnDestroy {
  @Input() project: VendorProject;
  @Output() createChat = new EventEmitter<VendorProject>();
  isSelect = false;
  self = 'VendorProjectMinCardComponent';
  selectChatSubscription: Subscription;
  menuIsOpen = false;
  closeMenuSubscription: Subscription;
  showUnreadMessagesSubscription: Subscription;
  showUnreadMessageCircle = false;

  constructor(private stateService: StateService, private chatService: ChatService) { }

  ngOnInit() {
    this.setUnreadMessagesWhenInit();

    this.selectChatSubscription = this.stateService.selectedProjectForChat$.subscribe(
      (project: VendorProject) => {
        if (project != null) {
          if (project.chat.id === this.project.chat.id) {
            this.isSelect = true;
          } else {
            this.isSelect = false;
          }
        }
      }
    );

    this.closeMenuSubscription = this.stateService.setCloseAllCardsMenu$.subscribe(
      val => {
        if (val) {
          this.menuIsOpen = false;
        }
      }
    );

    this.showUnreadMessagesSubscription = this.stateService.showUnreadMessages$.subscribe(
      (showUnreadMessages: IShowUnreadMessages) => {
        if (showUnreadMessages.message != null) {
          if (this.project.chat.id === showUnreadMessages.message.conversationId) {
            this.showUnreadMessageCircle = true;
          }
        }
        if (showUnreadMessages.projectWithChat != null) {
          if (this.project.chat.id === showUnreadMessages.projectWithChat.chat.id) {
            this.showUnreadMessageCircle = false;
          }
        }
      }
    );
  }

  getAvataraUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

  projectWrapperClick() {
    this.stateService.selectedProjectForChat$.next(this.project);
    this.stateService.showUnreadMessages$.next({ projectWithChat: this.project });
    console.log('project = ', this.project);
  }

  canCreatePrivateChat(): boolean {
    if (this.project.chat.creatorId === this.stateService.getUserId()) {
      return false;
    }
    if (this.project.chat.conversationType === ChatType.p2p) {
      return false;
    }
    return true;
  }

  canBlockOrUnblock(): boolean {
    if (this.project.chat.conversationType === ChatType.all2all) {
      return false;
    }
    return true;
  }

  chatIsBlock(): boolean {
    if (this.project.chat.isBlock === true) {
      return true;
    }
    return false;
  }

  moreActions(event) {
    event.stopPropagation();
    this.stateService.setCloseAllCardsMenu$.next(true);
    requestAnimationFrame(() => {
      this.menuIsOpen = !this.menuIsOpen;
    });
  }

  sendMessage() {
    event.stopPropagation();
    this.stateService.setCloseAllCardsMenu$.next(true);
    this.stateService.selectedProjectForChat$.next(this.project);
  }

  privateChat() {
    event.stopPropagation();
    this.stateService.setCloseAllCardsMenu$.next(true);
    this.createChat.emit(this.project);
  }

  block() {
    event.stopPropagation();
    this.stateService.setCloseAllCardsMenu$.next(true);
    this.chatService.blockConversationP2P(this.project.chat.id, this.project.chat.participant.id).subscribe(
      () => {
        this.project.chat.isBlock = true;
        this.stateService.blockedOrUnblockedChat$.next(this.project.chat);
      }
    );
  }

  unblock() {
    event.stopPropagation();
    this.menuIsOpen = false;
    this.chatService.unblockConversationP2P(this.project.chat.id, this.project.chat.participant.id).subscribe(
      () => {
        this.project.chat.isBlock = null; // as in response
        this.stateService.blockedOrUnblockedChat$.next(this.project.chat);
      }
    );
  }

  isPrivateChat(): boolean {
    if (this.project.chat.conversationType === ChatType.p2p) {
      return true;
    }
    return false;
  }

  setUnreadMessagesWhenInit() {
    let needShowUnreadMsg: boolean;
    if (this.project.chat.participant != null) {
      needShowUnreadMsg = new Date(this.project.chat.lastActivityDate).getTime() > new Date(this.project.chat.participant.lastReadDate).getTime();
    }

    if (this.project.chat.participant != null && needShowUnreadMsg) { // todo
      this.showUnreadMessageCircle = true;
    } else {
      this.showUnreadMessageCircle = false;
    }
  }

  ngOnDestroy() {
    this.selectChatSubscription.unsubscribe();
    this.closeMenuSubscription.unsubscribe();
    this.showUnreadMessagesSubscription.unsubscribe();
  }
}
