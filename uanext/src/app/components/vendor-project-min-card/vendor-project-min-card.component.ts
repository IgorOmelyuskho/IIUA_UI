import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { StateService } from 'src/app/services/state/state.service';
import { ChatType } from 'src/app/models/chat/chatType';

@Component({
  selector: 'app-vendor-project-min-card',
  templateUrl: './vendor-project-min-card.component.html',
  styleUrls: ['./vendor-project-min-card.component.scss']
})
export class VendorProjectMinCardComponent implements OnInit {
  @Input() project: VendorProject;
  @Input() isSelect: boolean;
  @Output() selectEvent = new EventEmitter<VendorProject>();
  @Output() createChat = new EventEmitter<VendorProject>();
  self = 'VendorProjectMinCardComponent';

  constructor(private stateService: StateService) { }

  ngOnInit() {}

  getAvataraUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

  projectWrapperClick(project: VendorProject) {
    this.selectEvent.emit(project);
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
}
