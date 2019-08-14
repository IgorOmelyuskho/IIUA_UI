import { Component, OnInit, Input, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import * as autosize from 'autosize';
import { ChatService } from 'src/app/services/http/chat.service';
import { Chat } from 'src/app/models/chat/chat';
import { Observable, Subscription } from 'rxjs';
import { Message } from 'src/app/models/chat/message';
import { StateService } from 'src/app/services/state/state.service';
import { ChatSignalRService } from 'src/app/services/chat-signal-r.service';
import { FileResponseDto } from 'src/app/models/fileResponseDto';
import { FilesService } from 'src/app/services/http/files.service';

@Component({
  selector: 'app-investor-comments',
  templateUrl: './investor-comments.component.html',
  styleUrls: ['./investor-comments.component.scss']
})
export class InvestorCommentsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() project: VendorProject;
  @ViewChild('messagesElem') messagesElement: ElementRef;
  self = 'InvestorCommentsComponent';
  textareaSelector1 = '.send-comment .textarea-wrapper textarea';
  textareaSelector2 = '.comments-wrapper .comment .answer .textarea-wrapper textarea';
  chat: Chat;
  messages: Message[] = [];
  messagesLoading = false;
  sharedChatMsgText: string;
  uploadFilesSubscribe: Subscription;
  attachmentData: FileResponseDto | any = {};
  previewAttachment: any;
  attachmentReady = true;
  selfUserId: string;

  constructor(private chatService: ChatService, private stateService: StateService, private chatSignalR: ChatSignalRService, private fileService: FilesService) { }

  ngOnInit() {
    this.selfUserId = this.stateService.userId();

    this.chatSignalR.signalRConnect(this.onSignalRMessage);

    console.log(this.project);
    requestAnimationFrame(() => {
      autosize(document.querySelector(this.textareaSelector1));
      autosize(document.querySelectorAll(this.textareaSelector2));
    });

    this.chatService.getChatBProjectId(this.project.id).subscribe(
      (chat: Chat) => {
        this.chat = chat;
        console.log(this.chat);
        this.getMessagesByChatIdSubscribe(this.chatService.getMessagesByChatId(this.chat.id), true);
      },
      err => {
        console.warn(err);
      }
    );
  }

  ngAfterViewInit() {
    this.scrollToBottom(this.messagesElement.nativeElement);
  }

  onSignalRMessage = (message: Message) => {
    message.isYou = this.messageIsYou(message);
    this.messages.push(message);
    this.chatService.sortMessages(this.messages);
    console.log(message);
  }

  scrollToBottom(element: HTMLElement) {
    element.scrollTop = element.scrollHeight;
  }

  getMessagesByChatIdSubscribe(observable: Observable<any>, initial: boolean) {
    this.messagesLoading = true;
    observable.subscribe(
      (messages: Message[]) => {
        requestAnimationFrame(() => {
          autosize.destroy(document.querySelectorAll(this.textareaSelector2));
          autosize(document.querySelectorAll(this.textareaSelector2));
        });
        for (let i = 0; i < messages.length; i++) {
          messages[i].isYou = this.messageIsYou(messages[i]);
          this.messages.push(messages[i]);
          this.chatService.sortMessages(this.messages);
        }
        console.log(this.messages);
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
    // if (message.participantId === this.selfUserId) {
    //   return true;
    // } else {
    //   return false;
    // }
    if (Math.random() > 0.5) {
      return true;
    } else {
      return false;
    }
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
    if (this.uploadFilesSubscribe != null) {
      this.uploadFilesSubscribe.unsubscribe();
    }
    this.previewAttachment = null;
    this.attachmentData = {};
    this.attachmentReady = true;
  }

  onScrollUp() {
    this.getMessagesByChatIdSubscribe(this.chatService.getMessagesByChatId(this.chat.id), false);
  }

  defineFileType(originalFileName: string) {
    return this.fileService.defineFileType(originalFileName);
  }

  sendMessageToSharedChat() {
    if (
      (this.sharedChatMsgText === '' || this.sharedChatMsgText == null) &&
      (this.attachmentData == null || this.attachmentData.url == null || this.attachmentData.originalName == null)
    ) {
      return;
    }

    const message: Message = {
      text: this.sharedChatMsgText,
      conversationId: this.chat.id,
      participantId: this.stateService.userId(),
      attachmentId: null,
      attachmentUrl: null,
      attachmentOriginalName: null,
    };

    this.chatService.createMessage(message).subscribe(
      (msg: Message) => {
        this.messages.push(msg);
        console.log(this.messages);
        this.sharedChatMsgText = '';
        this.attachmentData = {};
        this.previewAttachment = null;
        this.chatService.sortMessages(this.messages);
        requestAnimationFrame(() => {
          autosize.update(document.querySelector(this.textareaSelector1));
          this.scrollToBottom(this.messagesElement.nativeElement);
        });
      },
      err => {
        console.warn(err);
      }
    );
  }

  ngOnDestroy() {
    autosize.destroy(document.querySelector(this.textareaSelector1));
    autosize.destroy(document.querySelectorAll(this.textareaSelector2));
    this.chatSignalR.signalRDisconnect();
    if (this.uploadFilesSubscribe != null) {
      this.uploadFilesSubscribe.unsubscribe();
    }
  }
}
