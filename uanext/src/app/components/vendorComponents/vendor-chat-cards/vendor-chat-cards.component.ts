import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { Chat } from 'src/app/models/chat/chat';
import { ChatType } from 'src/app/models/chat/chatType';
import { ChatService } from 'src/app/services/http/chat.service';
import { GetChatsParams } from 'src/app/models/chat/getChatsParams';
import { ProjectsCacheService } from 'src/app/services/projects-cache.service';
import { StateService } from 'src/app/services/state.service';
import { Subscription } from 'rxjs';
import { ChatSignalRService } from 'src/app/services/chat-signal-r.service';
import { Message } from 'src/app/models/chat/message';

@Component({
  selector: 'app-vendor-chat-cards',
  templateUrl: './vendor-chat-cards.component.html',
  styleUrls: ['./vendor-chat-cards.component.scss']
})
export class VendorFindInvestorComponent implements OnInit, OnDestroy {
  self = 'VendorFindInvestorComponent';
  projectsWithChat: VendorProject[] = [];
  selectedChatType = 'all'; // group/private
  searchName = '';
  numberOfConversation = 0;
  readonly chatsCount = 15;
  @ViewChild('projectsElem') projectsElem: ElementRef;
  requestNumber = 0;
  projectWithPrivateChat: VendorProject;
  signalChatRSubscription: Subscription; // use for create new chat if private chat message receive. but chat still not created
  notShownChatsId: string[];

  helperChatProject: VendorProject = { // todo or get by id ?
    name: 'HELP CHAT TODO',
    legalEntityName: 'legal entity name todo',
    region: 'todo',
    address: 'todo',
    description: 'todo',
    avatara: {
      id: 1,
      originalName: 'Network-Profile.png',
      url: 'http://localhost:4200/assets/img/Network-Profile.png'
    }
  };

  constructor(
    private chatService: ChatService,
    private projectsCacheService: ProjectsCacheService,
    private stateService: StateService,
    private chatSignalR: ChatSignalRService,
  ) { }

  ngOnInit() {
    window.addEventListener('click', this.windowClickHandler);
    this.chatService.getOrCreateHelp().subscribe(
      (helpChat: Chat) => {
        this.helperChatProject = this.projectWithChat(this.helperChatProject, helpChat);
        this.allChats();
      }
    );

    this.signalChatRSubscription = this.chatSignalR.messageReceived$.subscribe(
      (message: Message) => {
        if (this.chatService.messageIsYou(message) === false) {
          this.chatService.markChatAsUnread(message.conversationId);
        }

        this.messageFromExistOrNotExistChat(message);
      }
    );
  }

  messageFromExistOrNotExistChat(message: Message) {
    for (let i = 0; i < this.projectsWithChat.length; i++) {
      if (this.projectsWithChat[i].chat.id === message.conversationId) {
        console.log('SAME CHAT ALREADY HAS');
        return;
      }
    }
    this.messageFromNonExistentChat(message);
  }

  messageFromNonExistentChat(message: Message) {
    // also need check when notShownChat already shown
    // if send lot of msg from 1 not exist chat - unread chats count must change by 1 (not by msg count)
    console.log('there is no such chat yet, message = ', message);
    if (this.notShownChatsId.indexOf(message.conversationId) === -1) {
      this.notShownChatsId.push(message.conversationId);
      this.chatService.markChatAsUnread(null);
    }
  }

  windowClickHandler = () => {
    this.chatService.setCloseAllCardsMenu$.next(true);
  }

  getAvataraUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

  getPaginationChatSubscribe(params: GetChatsParams) {
    this.requestNumber++;
    const requestNumber = this.requestNumber;
    this.chatService.getPaginationOfConversations(params).subscribe(
      (chats: Chat[]) => {
        if (this.requestNumber !== requestNumber) {
          return;
        }
        this.numberOfConversation += this.chatsCount;
        for (let i = 0; i < chats.length; i++) {
          this.getProjectByChatSubscribe(chats[i], requestNumber);
        }
      }
    );
  }

  getProjectByChatSubscribe(chat: Chat, requestNumber: number) {
    this.projectsCacheService.getProject(chat.projectId).subscribe(
      (project: VendorProject) => {
        if (this.requestNumber !== requestNumber) { // if the previous request did not have time to complete, and we are already waiting for the results from the next request
          return;
        }
        const projectWithChat: VendorProject = this.projectWithChat(project, chat);
        if (this.projectsWithChat.length === 0) {
          this.chatService.selectedProjectForChat$.next(projectWithChat);
        }
        this.projectsWithChat.push(projectWithChat);
      }
    );
  }

  allChats() {
    this.selectedChatType = 'all';
    this.beforeFindNewChats();
    const params: GetChatsParams = {
      numberOfConversation: this.numberOfConversation,
      count: this.chatsCount,
    };
    this.getPaginationChatSubscribe(params);
  }

  allChatsScroll() {
    const params: GetChatsParams = {
      numberOfConversation: this.numberOfConversation,
      count: this.chatsCount,
    };
    this.getPaginationChatSubscribe(params);
  }

  groupChats() {
    this.selectedChatType = 'group';
    this.beforeFindNewChats();
    const params: GetChatsParams = {
      numberOfConversation: this.numberOfConversation,
      count: this.chatsCount,
      conversationType: ChatType.all2all
    };
    this.getPaginationChatSubscribe(params);
  }

  groupChatsScroll() {
    const params: GetChatsParams = {
      numberOfConversation: this.numberOfConversation,
      count: this.chatsCount,
      conversationType: ChatType.all2all
    };
    this.getPaginationChatSubscribe(params);
  }

  privateChats(project?: VendorProject) { // use in HTML without params
    this.selectedChatType = 'private';
    this.beforeFindNewChats();
    if (project != null) {
      this.projectsWithChat.push(project);
      this.chatService.selectedProjectForChat$.next(project);
    }
    const params: GetChatsParams = {
      numberOfConversation: this.numberOfConversation,
      count: this.chatsCount,
      conversationType: ChatType.p2p
    };
    this.getPaginationChatSubscribe(params);
  }

  privateChatsScroll() {
    const params: GetChatsParams = {
      numberOfConversation: this.numberOfConversation,
      count: this.chatsCount,
      conversationType: ChatType.p2p
    };
    this.getPaginationChatSubscribe(params);
  }

  findChatByProjectName() {
    this.selectedChatType = 'all';
    this.beforeFindNewChats();
    const params: GetChatsParams = {
      count: this.chatsCount,
      projectName: this.searchName
    };
    this.getPaginationChatSubscribe(params);
  }

  findChatByProjectNameScroll() {
    const params: GetChatsParams = {
      count: this.chatsCount,
      projectName: this.searchName
    };
    this.getPaginationChatSubscribe(params);
  }

  beforeFindNewChats() {
    this.chatService.selectedProjectForChat$.next(null);
    this.projectsElem.nativeElement.scrollTop = 0;
    this.numberOfConversation = 0;
    this.projectsWithChat = [];
    this.insertHelpChat();
  }

  insertHelpChat() {
    this.projectsWithChat.push(this.helperChatProject);
    this.chatService.selectedProjectForChat$.next(this.helperChatProject);
  }

  projectWithChat(project: VendorProject, chat: Chat): VendorProject {
    project.chat = chat;
    return project;
  }

  createPrivateChat(project: VendorProject) {
    this.chatService.getOrCreateP2P(project.id).subscribe(
      (chat: Chat) => {
        const projectClone: VendorProject = { ...project };
        this.projectWithPrivateChat = this.projectWithChat(projectClone, chat);
        this.privateChats(this.projectWithPrivateChat);
      }
    );
  }

  onScroll() {
    if (this.selectedChatType === 'all') {
      this.allChatsScroll();
    }
    if (this.selectedChatType === 'private') {
      this.privateChatsScroll();
    }
    if (this.selectedChatType === 'group') {
      this.groupChatsScroll();
    }
  }

  ngOnDestroy() {
    window.removeEventListener('click', this.windowClickHandler);
    this.signalChatRSubscription.unsubscribe();
  }
}
