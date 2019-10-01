import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { StateService } from 'src/app/services/state/state.service';
import { ChatType } from 'src/app/models/chat/chatType';
import { Subscription } from 'rxjs';

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

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.selectChatSubscription = this.stateService.selectedProjectForChat$.subscribe(
      (project: VendorProject) => {
        if (project != null) {
          if (project.id === this.project.id) {
            this.isSelect = true;
          } else {
            this.isSelect = false;
          }
        }
      }
    );
  }

  getAvataraUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

  projectWrapperClick(project: VendorProject) {
    this.stateService.selectedProjectForChat$.next(project);
  }

  createPrivateChat(event) {
    event.stopPropagation();
    this.createChat.emit(this.project);
  }

  canCreatePrivateChat(): boolean {
    if (this.project.chat == null) {
      return false;
    }
    if (this.project.chat.creatorId === this.stateService.getUserId()) {
      return false;
    }
    if (this.project.chat.conversationType === ChatType.p2p) {
      return false;
    }
    return true;
  }

  ngOnDestroy() {
    this.selectChatSubscription.unsubscribe();
  }
}
