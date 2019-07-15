import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ChatService } from 'src/app/services/http/chat.service';
import { Message } from 'src/app/models/chat/message';
import { FilesService } from 'src/app/services/http/files.service';
import { StateService } from 'src/app/services/state/state.service';
import { Observable } from 'rxjs';
import { FileResponseDto } from 'src/app/models/fileResponseDto';

@Component({
  selector: 'app-vendor-messages',
  templateUrl: './vendor-messages.component.html',
  styleUrls: ['./vendor-messages.component.scss']
})
export class VendorMessagesComponent implements OnInit, AfterViewInit, OnDestroy {
  self = 'VendorMessagesComponent';
  @ViewChild('messagesElem') messagesElement: ElementRef;
  textFromInput: string;
  selfUserId: string;
  chatParticipantAvatara = 'https://www.shareicon.net/data/128x128/2015/09/24/106428_man_512x512.png'; // todo get avatara from user id ?
  attachmentData: FileResponseDto | any = {};

  messages: Message[] = [];

  constructor(private chatService: ChatService, private fileService: FilesService, private stateService: StateService) { }

  ngOnInit() {
    this.getAllMessagesSubscribe(this.chatService.getAllMessages());
  }

  getAllMessagesSubscribe(observable: Observable<Message[]>) {
    observable.subscribe(
      (messages: Message[]) => {
        for (let i = 0; i < messages.length; i++) {
          this.messages.push(messages[i]);
        }
        console.log(messages);
      }
    );
  }

  ngAfterViewInit() {
    this.messagesElement.nativeElement.addEventListener('scroll', this.whenScrollTop);
    this.scrollToBottom(this.messagesElement.nativeElement);

    this.defineFileType('111111.png');
  }

  getImageUrl(url) {
    return 'url("' + url + '")';
  }

  whenScrollBottom(event) {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      console.log('scrolled bottom');
    }
  }

  whenScrollTop(event) {
    const element = event.target;
    if (element.scrollTop === 0) {
      console.log('scrolled top');
      this.getAllMessagesSubscribe(this.chatService.getAllMessages());
    }
  }

  scrollToBottom(element: HTMLElement) {
    element.scrollTop = element.scrollHeight;
  }

  defineFileType(originalFileName: string) {
    return this.fileService.defineFileType(originalFileName);
  }

  sendMessage() {
    const message: Message = {
      text: this.textFromInput,
      conversationId: 'string',
      participantId: 'string',
      attachmentId: this.attachmentData.id,
      attachmentUrl: this.attachmentData.url,
      attachmentOriginalName: this.attachmentData.originalName,
      lastUpdatedDate: 'string',
      isYou: true
    };

    this.attachmentData = {};
    this.textFromInput = '';
    console.log(message);
  }

  handleAttachmentChange(event) {
    const formData = new FormData();
    const attachmentFile = event.target['files'][0];
    formData.append(attachmentFile.name, attachmentFile);

    this.fileService.uploadFiles(formData).subscribe(
      (val: FileResponseDto[]) => {
        this.attachmentData = val[0];
      }
    );
  }

  ngOnDestroy() {
    this.messagesElement.nativeElement.removeEventListener('scroll', this.whenScrollTop);
  }
}
