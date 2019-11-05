import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { ChatService } from 'src/app/services/http/chat.service';
import { Message } from 'src/app/models/chat/message';
import { FilesService } from 'src/app/services/http/files.service';
import { StateService } from 'src/app/services/state.service';
import { Observable, Subscription } from 'rxjs';
import { FileResponseDto } from 'src/app/models/fileResponseDto';
import { VendorProject } from 'src/app/models/vendorProject';
import { Chat } from 'src/app/models/chat/chat';
import { ChatSignalRService } from 'src/app/services/chat-signal-r.service';
import { Participant } from 'src/app/models/chat/chatParticipant';
import { ParticipantsCacheService } from 'src/app/services/participants-cache.service';

@Component({
  selector: 'app-investor-messages',
  templateUrl: './investor-messages.component.html',
  styleUrls: ['./investor-messages.component.scss']
})
export class InvestorMessagesComponent implements OnInit {
  self = 'InvestorMessagesComponent';

  constructor() {}

  ngOnInit() {}
}
