import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { ChatService } from 'src/app/services/http/chat.service';
import { Message } from 'src/app/models/chat/message';
import { FilesService } from 'src/app/services/http/files.service';
import { StateService } from 'src/app/services/state.service';
import { Observable, Subscription } from 'rxjs';
import { FileResponseDto } from 'src/app/models/fileResponseDto';
import * as autosize from 'autosize';
import { VendorProject } from 'src/app/models/vendorProject';
import { Chat } from 'src/app/models/chat/chat';
import { ChatSignalRService } from 'src/app/services/chat-signal-r.service';
import { Participant } from 'src/app/models/chat/chatParticipant';
import { ParticipantsCacheService } from 'src/app/services/participants-cache.service';

const msg_test: Message = {
  attachmentId: null,
  attachmentOriginalName: null,
  attachmentUrl: null,
  conversationId: '2270fbca-6757-4553-19c5-08d73f7fc4c7_35',
  createdDate: new Date(),
  creator: '3e26d08b-2348-49a8-82ae-08d74bf1fffb',
  id: '1ce6f3f7-1a02-4473-a7ab-9c97540276e2',
  lastUpdatedDate: new Date(),
  leaveDate: null,
  participantId: '836ece40-80a6-44e5-a520-c1757a2a0ad1',
  text: 'Message created automatically 308',
  userId: '3e26d08b-2348-49a8-82ae-08d74bf1fffb',
};

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
  chatParticipantAvatara = 'https://www.shareicon.net/data/128x128/2015/09/24/106428_man_512x512.png'; // todo get avatara from user id ?
  attachmentData: FileResponseDto | any = {};
  previewAttachment: any;
  messages: Message[] = [];
  messagesLoading = false;
  attachmentReady = true;
  uploadFilesSubscribe: Subscription;
  textareaSelector = '.bottom-wrapper .textarea-wrapper textarea';
  projectSubscription: Subscription;
  signalChatRSubscription: Subscription;
  newMsgCame = false;
  readonly msgCountForReceive = 20;
  chatIsBlocked = false;
  cnt = 0; // for automaticallyCreateMsg
  cnt1 = 0; // todo remove
  blockedOrUnblockedChatSubscription: Subscription;

  constructor(
    private chatService: ChatService,
    private fileService: FilesService,
    private stateService: StateService,
    private chatSignalR: ChatSignalRService,
    private participantsCacheService: ParticipantsCacheService
  ) { }

  ngOnInit() {
    this.projectSubscription = this.chatService.selectedProjectForChat$.subscribe(
      (project: VendorProject) => {
        if (project != null) {
          this.project = project;
          this.chatIsBlocked = this.project.chat.isBlock;
          this.getMessagesByChatIdSubscribe(
            this.chatService.getMessagesByChatId(this.project.chat.id, null, this.msgCountForReceive), true
          );
        }
      }
    );

    this.blockedOrUnblockedChatSubscription = this.chatService.blockedOrUnblockedChat$.subscribe(
      (blockedOrUnblockedChat: Chat) => {
        if (blockedOrUnblockedChat.id === this.project.chat.id) {
          if (blockedOrUnblockedChat.isBlock === true) {
            this.chatIsBlocked = true;
          } else {
            this.chatIsBlocked = false;
          }
        }
      }
    );

    // setInterval(() => {
    //   this.messages.push({
    //     ...msg_test,
    //     text: (this.cnt1++).toString()
    //   } );
    // }, 500);
  }

  ngAfterViewInit() {
    autosize(document.querySelector(this.textareaSelector));

    this.signalChatRSubscription = this.chatSignalR.messageReceived$.subscribe(
      (message: Message) => {
        this.onSignalRMessage(message);
      }
    );

    this.scrollToBottom();
    this.messagesElement.nativeElement.addEventListener('scroll', this.scrollHandler);
  }

  automaticallyCreateMsg() {
    setInterval(() => {
      this.attachmentReady = true;
      this.cnt++;
      this.textFromInput = 'Message created automatically ' + this.cnt;
      this.sendMessage();
    }, 1000);
  }

  onSignalRMessage = (message: Message) => {
    if (this.project == null) { // wait for this.stateService.selectedProjectForChat$.subscribe
      return;
    }
    if (message.conversationId !== this.project.chat.id) {
      return;
    }
    message.isYou = this.chatService.messageIsYou(message);
    this.messages.push(message);

    if (this.messagesElement.nativeElement.offsetHeight === this.messagesElement.nativeElement.scrollHeight) {
      this.whenReadMessage();
    }

    this.getParticipantByParticipantId(message);

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
      this.whenReadMessage();
    }
  }

  newMsgCameBtnClick() {
    this.newMsgCame = false;
    this.whenReadMessage();
    this.scrollToBottom();
  }

  whenReadMessage() {
    this.chatService.markChatAsRead(this.project.chat);
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
          messages[i].isYou = this.chatService.messageIsYou(messages[i]);
          this.getParticipantByParticipantId(messages[i]);
        }
        this.messages = messages.reverse().concat(this.messages);
        this.messagesLoading = false;
      },
      err => {
        console.warn(err);
        this.messagesLoading = false;
      }
    );
  }

  getParticipantByParticipantId(message: Message) {
    this.participantsCacheService.getParticipant(message.participantId).subscribe(
      (participant: Participant) => {
        message.participant = participant;
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
      conversationId: this.project.chat.id,
      userId: this.stateService.getUserId(),
      attachmentId: this.attachmentData.id,
      attachmentUrl: this.attachmentData.url,
      attachmentOriginalName: this.attachmentData.originalName,
    };

    this.chatService.createMessage(message).subscribe(
      (msg: Message) => {
        this.chatIsBlocked = false;
      },
      err => {
        if (err.status === 404) { // chat is blocked
          this.chatIsBlocked = true;
        }
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
    const date = this.messages[0].createdDate;
    // this.automaticallyCreateMsg();
    this.getMessagesByChatIdSubscribe(
      this.chatService.getMessagesByChatId(this.project.chat.id, date, this.msgCountForReceive), false
    );
  }

  ngOnDestroy() {
    this.messagesElement.nativeElement.removeEventListener('scroll', this.scrollHandler);
    this.projectSubscription.unsubscribe();
    this.signalChatRSubscription.unsubscribe();
    this.blockedOrUnblockedChatSubscription.unsubscribe();
    autosize.destroy(document.querySelector(this.textareaSelector));
    if (this.uploadFilesSubscribe != null) {
      this.uploadFilesSubscribe.unsubscribe();
    }
  }
}
