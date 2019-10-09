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
  chats: Chat[] = [];
  readonly chatsCount = 15;
  @ViewChild('projectsElem') projectsElem: ElementRef;
  requestNumber = 0;
  projectWithPrivateChat: VendorProject;
  signalChatRSubscription: Subscription; // use for create new chat if private chat message receive. but chat still not created

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
    // this.allChats();
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
          this.stateService.showUnreadMessages$.next({ message });
        }

        for (let i = 0; i < this.projectsWithChat.length; i++) { // remove?
          if (this.projectsWithChat[i].chat.id === message.conversationId) {
            console.log('SAME CHAT ALREADY HAS');
            return;
          }
        }
        console.log('there is no such chat yet, message = ', message);
      }
    );

    this.chatService.getAllChats().subscribe(
      (chats: Chat[]) => {
        this.stateService.unreadChatsCount$.next(chats.length);

        for (let i = 0; i < chats.length; i++) {
          console.log(chats[i].participant);
        }
      }
    );
  }

  windowClickHandler = () => {
    this.stateService.setCloseAllCardsMenu$.next(true);
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
          this.stateService.selectedProjectForChat$.next(projectWithChat);
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
      this.stateService.selectedProjectForChat$.next(project);
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
    this.stateService.selectedProjectForChat$.next(null);
    this.projectsElem.nativeElement.scrollTop = 0;
    this.numberOfConversation = 0;
    this.projectsWithChat = [];
    this.insertHelpChat();
  }

  insertHelpChat() {
    this.projectsWithChat.push(this.helperChatProject);
    this.stateService.selectedProjectForChat$.next(this.helperChatProject);
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
