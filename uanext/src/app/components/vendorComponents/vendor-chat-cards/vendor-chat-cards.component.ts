import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { Chat } from 'src/app/models/chat/chat';
import { ChatType } from 'src/app/models/chat/chatType';
import { ChatService } from 'src/app/services/http/chat.service';
import { GetChatsParams } from 'src/app/models/chat/getChatsParams';
import { ProjectsCacheService } from 'src/app/services/projects-cache.service';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-vendor-chat-cards',
  templateUrl: './vendor-chat-cards.component.html',
  styleUrls: ['./vendor-chat-cards.component.scss']
})
export class VendorFindInvestorComponent implements OnInit {
  // projects: VendorProject[] = [...responseProjects.projectsList, ...responseProjects.projectsList];
  projectsWithChat: VendorProject[] = [];
  self = 'VendorFindInvestorComponent';
  selectedChatType = 'all'; // group/single
  searchName = '';
  numberOfConversation = 0;
  chats: Chat[] = [];
  readonly chatsCount = 15;
  @ViewChild('projectsElem') projectsElem: ElementRef;
  requestNumber = 0;
  projectWithPrivateChat: VendorProject;

  constructor(
    private chatService: ChatService,
    private projectsCacheService: ProjectsCacheService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.allChats();
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
        this.numberOfConversation += chats.length;
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
        if (this.samePrivateChatAlreadyExist() === true && this.selectedChatType === 'single') { // so as not to duplicate a private chat if it has already been created
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

  singleChats(project?: VendorProject) { // use in HTML without params
    this.selectedChatType = 'single';
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

  singleChatsScroll() {
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

  // if this.chatService.getOrCreateP2P return already exist chat - not now created
  samePrivateChatAlreadyExist(): boolean {
    if (this.projectWithPrivateChat == null) {
      return false;
    }
    for (let i = 0; i < this.projectsWithChat.length; i++) {
      if (this.projectsWithChat[i].chat.id === this.projectWithPrivateChat.chat.id) {
        return true;
      }
    }
    return false;
  }

  beforeFindNewChats() {
    this.stateService.selectedProjectForChat$.next(null);
    this.projectsElem.nativeElement.scrollTop = 0;
    this.numberOfConversation = 0;
    this.projectsWithChat = [];
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
        this.singleChats(this.projectWithPrivateChat);
      }
    );
  }

  onScroll() {
    this.allChatsScroll();
  }
}
