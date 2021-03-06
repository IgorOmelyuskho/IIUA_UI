import { Component, OnInit, Input, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { ChatService } from 'src/app/services/http/chat.service';
import { Chat } from 'src/app/models/chat/chat';
import { Observable, Subscription } from 'rxjs';
import { Message } from 'src/app/models/chat/message';
import { StateService } from 'src/app/services/state.service';
import { ChatSignalRService } from 'src/app/services/chat-signal-r.service';
import { FileResponseDto } from 'src/app/models/fileResponseDto';
import { FilesService } from 'src/app/services/http/files.service';
import { Participant } from 'src/app/models/chat/chatParticipant';
import { ParticipantsCacheService } from 'src/app/services/participants-cache.service';

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
  signalRSubscription: Subscription;

  constructor(private chatService: ChatService, private stateService: StateService, private chatSignalR: ChatSignalRService, private fileService: FilesService, private participantsCacheService: ParticipantsCacheService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.selfUserId = this.stateService.getUserId();

    this.signalRSubscription = this.chatSignalR.messageReceived$.subscribe(
      (message: Message) => {
        this.onSignalRMessage(message);
      }
    );

    requestAnimationFrame(() => {
  /*     autosize(document.querySelector(this.textareaSelector1));
      autosize(document.querySelectorAll(this.textareaSelector2)); */
    });

    this.chatService.getChatByProjectId(this.project.id).subscribe(
      (chat: Chat) => {
        this.chat = chat;
        this.getMessagesByChatIdSubscribe(this.chatService.getMessagesByChatId(this.chat.id, null, null), true);
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
    if (this.chat == null || message.conversationId !== this.chat.id) {
      return;
    }
    message.isYou = this.messageIsYou(message);
    this.messages.push(message);
    this.getParticipantByParticipantId(message);
    // this.chatService.sortMessages(this.messages);

    if (message.isYou === true) {
      this.sharedChatMsgText = '';
    }

    this.attachmentData = {};
    this.previewAttachment = null;
    if (message.isYou === false && this.messagesElement.nativeElement.scrollTop + this.messagesElement.nativeElement.offsetHeight < this.messagesElement.nativeElement.scrollHeight) {
      this.newMsgCame = true;
    } else {
      requestAnimationFrame(() => {
        this.scrollToBottom();
      });
    }
    requestAnimationFrame(() => {
      /* autosize.update(document.querySelector(this.textareaSelector1)); */
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
     /*      autosize.destroy(document.querySelectorAll(this.textareaSelector2)); // update not work
          autosize(document.querySelectorAll(this.textareaSelector2)); */
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
        // this.chatService.sortMessages(this.messages);
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
    this.participantsCacheService.getParticipant(message.participantId).subscribe(
      (participant: Participant) => {
        message.participant = participant;
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
    this.getMessagesByChatIdSubscribe(this.chatService.getMessagesByChatId(this.chat.id, null, null), false);
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

  ngOnDestroy() {
    this.messagesElement.nativeElement.removeEventListener('scroll', this.scrollHandler);
    this.signalRSubscription.unsubscribe();
    if (this.uploadFilesSubscribe != null) {
      this.uploadFilesSubscribe.unsubscribe();
    }
  }
}
