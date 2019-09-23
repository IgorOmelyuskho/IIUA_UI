import { Component, OnInit } from '@angular/core';
import { responseProjects } from 'src/app/helperClasses/projects';
import { VendorProject } from 'src/app/models/vendorProject';
import { FilteredProjectsService } from 'src/app/services/http/filtered-projects.service';
import { FilteredProjects } from 'src/app/models';
import { StateService } from 'src/app/services/state/state.service';
import { ChatsCacheService } from 'src/app/services/chats-cache.service';
import { Chat } from 'src/app/models/chat/chat';
import { ChatType } from 'src/app/models/chat/chatType';
import { ChatService } from 'src/app/services/http/chat.service';
import { ProjectsService } from 'src/app/services/http/projects.service';

@Component({
  selector: 'app-vendor-chat-cards',
  templateUrl: './vendor-chat-cards.component.html',
  styleUrls: ['./vendor-chat-cards.component.scss']
})
export class VendorFindInvestorComponent implements OnInit {
  // projects: VendorProject[] = [...responseProjects.projectsList, ...responseProjects.projectsList];
  projectsWithoutChat: VendorProject[] = [];
  projects: VendorProject[] = [];
  self = 'VendorFindInvestorComponent';
  selected = 'all'; // group/single
  selectedProject: VendorProject;
  searchName = '';

  constructor(
    private filteredProjectsService: FilteredProjectsService,
    private stateService: StateService,
    private chatsCacheService: ChatsCacheService,
    private chatService: ChatService,
    private projectsService: ProjectsService
  ) {
  }

  ngOnInit() {
    this.filteredProjectsService.searchByKeyword('', 1000, 1).subscribe(
      (filteredProjects: FilteredProjects) => {
        this.projectsWithoutChat = filteredProjects.projectsList;
        // this.selectedProject = this.projectsWithoutChat[0];
        // this.stateService.selectedProjectForChat$.next(this.selectedProject);
        for (let i = 0; i < this.projectsWithoutChat.length; i++) {
          this.getChatByProject(this.projectsWithoutChat[i]);
        }
      }
    );
  }

  getAvataraUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

  all() {
    this.selected = 'all';
  }

  group() {
    this.selected = 'group';
  }

  single() {
    this.selected = 'single';
  }

  projectSelectHandler(project: VendorProject) {
    this.selectedProject = project;
    this.stateService.selectedProjectForChat$.next(this.selectedProject);
  }

  findCardsByProjectName() {
    this.filteredProjectsService.searchByKeyword(this.searchName, 1000, 1).subscribe(
      (filteredProjects: FilteredProjects) => {
        this.projectsWithoutChat = filteredProjects.projectsList;
        this.projects = [];
        for (let i = 0; i < this.projectsWithoutChat.length; i++) {
          this.getChatByProject(this.projectsWithoutChat[i]);
        }
      }
    );
  }

  getChatByProject(project: VendorProject) {
    this.chatsCacheService.getData(project.id.toString()).subscribe(
      (chat: Chat) => {
        if (chat != null) {
          const projectWithChat: VendorProject = this.projectWithChat(project, chat);
          this.projects.push(projectWithChat);
        }
      }
    );
  }

  getProjectByChat(chat: Chat) {
    this.projectsService.getProjectById(chat.projectId).subscribe(
      (project: VendorProject) => {
        console.log(project);
      }
    );
  }

  projectWithChat(project: VendorProject, chat: Chat): VendorProject {
    project.chat = chat;
    return project;
  }

  allowedCards(project: VendorProject): boolean { // all/single/group
    if (this.selected === 'all') {
      return true;
    }
    if (project.chat == null) {
      return false;
    }
    if (project.chat.conversationType === ChatType.all2all && this.selected === 'group') {
      return true;
    }
    if (project.chat.conversationType === ChatType.p2p && this.selected === 'single') {
      return true;
    }
    return false;
  }

  createChat(project: VendorProject) {
    this.chatService.getOrCreateP2P(project.id).subscribe(
      (chat: Chat) => {
        const newProject: VendorProject = {...project};
        const projectWithChat: VendorProject = this.projectWithChat(newProject, chat);
        this.projects.unshift(projectWithChat);
        this.projectSelectHandler(newProject);
      }
    );
  }
}
