import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { ChatService } from 'src/app/services/http/chat.service';
import { Message } from 'src/app/models/chat/message';
import { FilesService } from 'src/app/services/http/files.service';
import { StateService } from 'src/app/services/state/state.service';
import { Observable, Subscription } from 'rxjs';
import { FileResponseDto } from 'src/app/models/fileResponseDto';
import * as autosize from 'autosize';
import { VendorProject } from 'src/app/models/vendorProject';
import { Chat } from 'src/app/models/chat/chat';
import { ChatSignalRService } from 'src/app/services/chat-signal-r.service';
import { Participant } from 'src/app/models/chat/chatParticipant';
import { ParticipantsCacheService } from 'src/app/services/participants-cache.service';

@Component({
  selector: 'app-vendor-messages',
  templateUrl: './vendor-messages.component.html',
  styleUrls: ['./vendor-messages.component.scss']
})
export class VendorMessagesComponent implements OnInit, AfterViewInit, OnDestroy {
  self = 'VendorMessagesComponent';
  @ViewChild('messagesElem') messagesElement: ElementRef;
  project: VendorProject;
  textFromInput: string;
  selfUserId: string;
  chatParticipantAvatara = 'https://www.shareicon.net/data/128x128/2015/09/24/106428_man_512x512.png'; // todo get avatara from user id ?
  attachmentData: FileResponseDto | any = {};
  previewAttachment: any;
  messages: Message[] = [];
  messagesLoading = false;
  attachmentReady = true;
  uploadFilesSubscribe: Subscription;
  textareaSelector = '.bottom-wrapper .textarea-wrapper textarea';
  projectSubscription: Subscription;
  signalRSubscription: Subscription;
  chat: Chat;
  newMsgCame = false;

  constructor(
    private chatService: ChatService,
    private fileService: FilesService,
    private stateService: StateService,
    private chatSignalR: ChatSignalRService,
    private participantsCacheService: ParticipantsCacheService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    autosize(document.querySelector(this.textareaSelector));
    this.selfUserId = this.stateService.getUserId();

    this.projectSubscription = this.stateService.selectedProjectForChat$.subscribe(
      (project: VendorProject) => {
        if (project != null) {
          this.project = project;
          this.getChatByProjectIdSubscribe(this.project.id);
        }
      }
    );

    this.signalRSubscription = this.chatSignalR.messageReceived$.subscribe(
      (message: Message) => {
        this.onSignalRMessage(message);
      }
    );

    this.scrollToBottom();
    this.messagesElement.nativeElement.addEventListener('scroll', this.scrollHandler);
  }

  onSignalRMessage = (message: Message) => {
    if (this.chat == null || message.conversationId !== this.chat.id) {
      return;
    }
    message.isYou = this.messageIsYou(message);
    this.messages.push(message);
    this.getParticipantByParticipantId(message);
    this.chatService.sortMessages(this.messages);

    this.attachmentData = {};
    this.previewAttachment = null;

    if (message.isYou === true) {
      this.textFromInput = '';
    }

    if (message.isYou === false && this.messagesElement.nativeElement.scrollTop + this.messagesElement.nativeElement.offsetHeight < this.messagesElement.nativeElement.scrollHeight) {
      this.newMsgCame = true;
    } else {
      requestAnimationFrame(() => {
        this.scrollToBottom();
      });
    }
    requestAnimationFrame(() => {
      autosize.update(document.querySelector(this.textareaSelector));
    });
  }

  scrollHandler = (event) => {
    if (this.messagesElement.nativeElement.scrollTop + this.messagesElement.nativeElement.offsetHeight >= this.messagesElement.nativeElement.scrollHeight) {
      this.newMsgCame = false;
    }
  }

  newMsgCameBtnClick() {
    this.newMsgCame = false;
    this.scrollToBottom();
  }

  getChatByProjectIdSubscribe(projectId: number) {
    this.chatService.getChatBProjectId(projectId).subscribe(
      (chat: Chat) => {
        this.chat = chat;
        this.getMessagesByChatIdSubscribe(this.chatService.getMessagesByChatId(this.chat.id), true);
      },
      err => {
        console.warn(err);
      }
    );
  }

  getMessagesByChatIdSubscribe(observable: Observable<any>, initial: boolean) {
    this.messagesLoading = true;
    observable.subscribe(
      (messages: Message[]) => {
        requestAnimationFrame(() => {
          autosize.destroy(document.querySelectorAll(this.textareaSelector)); // update not work
          autosize(document.querySelectorAll(this.textareaSelector));
        });
        if (initial === true) {
          this.messages = [];
          requestAnimationFrame(() => {
            this.scrollToBottom();
          });
        }
        for (let i = 0; i < messages.length; i++) {
          messages[i].isYou = this.messageIsYou(messages[i]);
          this.messages.push(messages[i]);
          this.getParticipantByParticipantId(messages[i]);
        }
        this.chatService.sortMessages(this.messages);
        this.messagesLoading = false;
      },
      err => {
        console.warn(err);
        this.messagesLoading = false;
      }
    );
  }

  messageIsYou(message: Message): boolean {
    if (message.userId === this.selfUserId) {
      return true;
    } else {
      return false;
    }
  }

  getParticipantByParticipantId(message: Message) {
    this.participantsCacheService.getData(message.participantId).subscribe(
      (participant: Participant) => {
        if (participant != null) {
          message.participant = participant;
        }
      }
    );
  }

  showDate(index: number): boolean {
    if (index === 0) {
      return true;
    }
    const date1 = this.messages[index - 1].createdDate.getDate();
    const date2 = this.messages[index].createdDate.getDate();
    if (date1 !== date2) {
      return true;
    }
    return false;
  }

  scrollToBottom() {
    this.messagesElement.nativeElement.scrollTop = this.messagesElement.nativeElement.scrollHeight;
  }

  defineFileType(originalFileName: string) {
    return this.fileService.defineFileType(originalFileName);
  }

  hasAttachment(message: Message): boolean {
    if (message.attachmentId == null || message.attachmentUrl == null || message.attachmentOriginalName == null) {
      return false;
    } else {
      return true;
    }
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
      conversationId: this.chat.id,
      userId: this.stateService.getUserId(),
      attachmentId: this.attachmentData.id,
      attachmentUrl: this.attachmentData.url,
      attachmentOriginalName: this.attachmentData.originalName,
    };

    this.chatService.createMessage(message).subscribe(
      (msg: Message) => { },
      err => {
        console.warn(err);
      }
    );
  }

  handleAttachmentChange(event) {
    if (this.uploadFilesSubscribe != null) {
      this.uploadFilesSubscribe.unsubscribe();
    }
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
    this.uploadFilesSubscribe = this.fileService.uploadFiles(formData).subscribe(
      (val: FileResponseDto[]) => {
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
    if (this.uploadFilesSubscribe != null) {
      this.uploadFilesSubscribe.unsubscribe();
    }
    this.previewAttachment = null;
    this.attachmentData = {};
    this.attachmentReady = true;
  }

  onScrollUp() {
    // this.getMessagesByChatIdSubscribe(this.chatService.getMessagesByChatId('chatId'), false);
  }

  ngOnDestroy() {
    this.messagesElement.nativeElement.removeEventListener('scroll', this.scrollHandler);
    this.projectSubscription.unsubscribe();
    this.signalRSubscription.unsubscribe();
    autosize.destroy(document.querySelector(this.textareaSelector));
    if (this.uploadFilesSubscribe != null) {
      this.uploadFilesSubscribe.unsubscribe();
    }
  }
}
