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
  @Input()
  set setProject(project: VendorProject) {
    if (project != null) {
      this.project = project;
    }
  }
  project: VendorProject;
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
  newMsgCame = false;
  subscription: Subscription;

  constructor(private chatService: ChatService, private stateService: StateService, private chatSignalR: ChatSignalRService, private fileService: FilesService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    console.log(this.project);
    this.selfUserId = this.stateService.userId();

    this.subscription = this.chatSignalR.$InvestorCommentsComponent.subscribe(
      (message: Message) => {
        this.onSignalRMessage(message);
      }
    );

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
    this.scrollToBottom();


    this.messagesElement.nativeElement.addEventListener('scroll', this.scrollHandler);
  }

  scrollHandler = (event) => {
    if (this.messagesElement.nativeElement.scrollTop + this.messagesElement.nativeElement.offsetHeight >= this.messagesElement.nativeElement.scrollHeight) {
      this.newMsgCame = false;
    }
  }

  onSignalRMessage = (message: Message) => {
    console.log(message);
    message.isYou = this.messageIsYou(message);
    this.messages.push(message);
    this.chatService.sortMessages(this.messages);

    this.sharedChatMsgText = '';
    this.attachmentData = {};
    this.previewAttachment = null;
    this.chatService.sortMessages(this.messages);
    if (this.messagesElement.nativeElement.scrollTop + this.messagesElement.nativeElement.offsetHeight < this.messagesElement.nativeElement.scrollHeight) {
      this.newMsgCame = true;
    } else {
      requestAnimationFrame(() => {
        this.scrollToBottom();
      });
    }
    requestAnimationFrame(() => {
      autosize.update(document.querySelector(this.textareaSelector1));
    });
  }

  scrollToBottom() {
    this.messagesElement.nativeElement.scrollTop = this.messagesElement.nativeElement.scrollHeight;
  }

  newMsgCameBtnClick() {
    this.newMsgCame = false;
    this.scrollToBottom();
  }

  getMessagesByChatIdSubscribe(observable: Observable<any>, initial: boolean) {
    this.messagesLoading = true;
    observable.subscribe(
      (messages: Message[]) => {
        requestAnimationFrame(() => {
          autosize.destroy(document.querySelectorAll(this.textareaSelector2)); // update not work
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
            this.scrollToBottom();
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
    // return false;
    if (message.userId === this.selfUserId) {
      return true;
    } else {
      return false;
    }
    // if (Math.random() > 0.5) {
    //   return true;
    // } else {
    //   return false;
    // }
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
    // this.getMessagesByChatIdSubscribe(this.chatService.getMessagesByChatId(this.chat.id), false); // get not all messages
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
      userId: this.stateService.userId(),
      participantId: 'participantId ?????',
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

  ngOnDestroy() {
    this.messagesElement.nativeElement.removeEventListener('scroll', this.scrollHandler);
    autosize.destroy(document.querySelector(this.textareaSelector1));
    autosize.destroy(document.querySelectorAll(this.textareaSelector2));
    this.subscription.unsubscribe();
    if (this.uploadFilesSubscribe != null) {
      this.uploadFilesSubscribe.unsubscribe();
    }
  }
}
