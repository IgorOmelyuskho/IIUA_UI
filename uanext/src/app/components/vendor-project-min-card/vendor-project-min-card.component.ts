import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { ChatService } from 'src/app/services/http/chat.service';
import { Chat } from 'src/app/models/chat/chat';

@Component({
  selector: 'app-vendor-project-min-card',
  templateUrl: './vendor-project-min-card.component.html',
  styleUrls: ['./vendor-project-min-card.component.scss']
})
export class VendorProjectMinCardComponent implements OnInit {
  @Input() project: VendorProject;
  @Input() isSelect: boolean;
  @Output() selectEvent = new EventEmitter<VendorProject>();
  self = 'VendorProjectMinCardComponent';

  constructor(private chatService: ChatService) { }

  ngOnInit() { }

  getAvataraUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

  projectWrapperClick(project: VendorProject) {
    this.selectEvent.emit(project);
  }

  createPrivateChat(event) {
    event.stopPropagation();
    this.chatService.getOrCreateP2P(this.project.id).subscribe(
      (chat: Chat) => {
        console.log(chat);
      }
    );
    console.log(this.project.id);
  }
}
