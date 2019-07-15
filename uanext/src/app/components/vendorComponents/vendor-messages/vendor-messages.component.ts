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
  previewAttachment: any;
  messages: Message[] = [];
  messagesLoading = false;
  attachmentReady = true;

  constructor(private chatService: ChatService, private fileService: FilesService, private stateService: StateService) { }

  ngOnInit() {
    this.getAllMessagesSubscribe(this.chatService.getAllMessages(), true);
  }

  getAllMessagesSubscribe(observable: Observable<Message[]>, initial?: boolean) {
    this.messagesLoading = true;
    observable.subscribe(
      (messages: Message[]) => {
        for (let i = 0; i < messages.length; i++) {
          messages[i].isYou = this.messageIsYou(messages[i]);
          this.messages.push(messages[i]);
        }
        console.log(messages);
        this.messagesLoading = false;
        if (initial === true) {
          requestAnimationFrame(() => {
            this.scrollToBottom(this.messagesElement.nativeElement);
          });
        }
      },
      err => {
        console.warn(err);
        this.messagesLoading = false;
      }
    );
  }

  messageIsYou(message: Message): boolean {
    // if (message.participantId === selfUserId)
    if (Math.random() > 0.5) {
      return true;
    } else {
      return false;
    }
  }

  ngAfterViewInit() {
    this.messagesElement.nativeElement.addEventListener('scroll', this.whenScrollTop);
    this.scrollToBottom(this.messagesElement.nativeElement);
  }

  getImageUrl(url) {
    return 'url("' + url + '")';
  }

  whenScrollBottom = (event) => {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      console.log('scrolled bottom');
    }
  }

  whenScrollTop = (event) => {
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
    if (this.attachmentReady === false) {
      return;
    }

    if (
      (this.textFromInput === '' || this.textFromInput == null) &&
      (this.attachmentData == null || this.attachmentData.url == null || this.attachmentData.originalName == null)
    ) {
      return;
    }

    const message: Message = {
      text: this.textFromInput,
      conversationId: 'string',
      participantId: 'string',
      attachmentId: this.attachmentData.id,
      attachmentUrl: this.attachmentData.url,
      attachmentOriginalName: this.attachmentData.originalName,
      lastUpdatedDate: '12:00',
    };

    this.attachmentData = {};
    this.previewAttachment = null;
    this.textFromInput = '';

    this.chatService.createMessage(message).subscribe(
      (msg: Message) => {
        console.log(msg);
        msg.isYou = true;
        this.messages.push(msg);
        requestAnimationFrame(() => {
          this.scrollToBottom(this.messagesElement.nativeElement);
        });
      },
      err => {
        console.warn(err);
      }
    );
  }

  handleAttachmentChange(event) {
    this.previewAttachment = null;
    this.attachmentData = {};

    const formData = new FormData();
    const attachmentFile = event.target['files'][0];
    formData.append(attachmentFile.name, attachmentFile);

    const fileReader = new FileReader();
    fileReader.onload = (file) => {
      this.attachmentData = {};
      this.previewAttachment = {};
      this.previewAttachment.name = event.target['files'][0].name;
      this.previewAttachment.binaryData = file.target['result'];
      event.target.value = '';
    };
    fileReader.readAsDataURL(event.target['files'][0]);

    this.attachmentReady = false;
    this.fileService.uploadFiles(formData).subscribe(
      (val: FileResponseDto[]) => {
        console.log(val);
        this.attachmentData = val[0];
        this.attachmentReady = true;
      },
      err => {
        console.warn(err);
        this.attachmentReady = true;
      }
    );
  }

  removeAttachment() {
    this.previewAttachment = null;
    this.attachmentData = {};
    this.attachmentReady = true;
  }

  ngOnDestroy() {
    this.messagesElement.nativeElement.removeEventListener('scroll', this.whenScrollTop);
  }
}
