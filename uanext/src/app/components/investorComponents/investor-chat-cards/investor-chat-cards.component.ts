import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { Chat } from 'src/app/models/chat/chat';
import { ChatType } from 'src/app/models/chat/chatType';
import { ChatService } from 'src/app/services/http/chat.service';
import { GetChatsParams } from 'src/app/models/chat/getChatsParams';
import { ProjectsCacheService } from 'src/app/services/projects-cache.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-investor-chat-cards',
  templateUrl: './investor-chat-cards.component.html',
  styleUrls: ['./investor-chat-cards.component.scss']
})
export class InvestorLastActivityComponent implements OnInit {
  self = 'InvestorLastActivityComponent';

  ngOnInit() { }
}
