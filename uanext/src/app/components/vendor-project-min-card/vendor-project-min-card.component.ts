import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { StateService } from 'src/app/services/state/state.service';
import { ChatType } from 'src/app/models/chat/chatType';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/http/chat.service';
import { delay } from 'rxjs/operators';

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

  constructor(private stateService: StateService, private chatService: ChatService) { }

  ngOnInit() {
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
  }

  getAvataraUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

  projectWrapperClick() {
    this.stateService.selectedProjectForChat$.next(this.project);
    console.log(this.project);
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
    if (this.project.chat.creatorId === this.stateService.getUserId()) {
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
      }
    );
  }

  unblock() {
    event.stopPropagation();
    this.menuIsOpen = false;
    this.chatService.unblockConversationP2P(this.project.chat.id, this.project.chat.participant.id).subscribe(
      () => {
        this.project.chat.isBlock = null; // as in response
      }
    );
  }

  ngOnDestroy() {
    this.selectChatSubscription.unsubscribe();
    this.closeMenuSubscription.unsubscribe();
  }
}
