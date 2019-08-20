import { Component, OnInit } from '@angular/core';
import { responseProjects } from 'src/app/helperClasses/projects';
import { VendorProject } from 'src/app/models/vendorProject';
import { FilteredProjectsService } from 'src/app/services/http/filtered-projects.service';
import { FilteredProjects } from 'src/app/models';
import { StateService } from 'src/app/services/state/state.service';
import { ChatsCacheService } from 'src/app/services/chats-cache.service';
import { Chat } from 'src/app/models/chat/chat';

@Component({
  selector: 'app-vendor-find-investor',
  templateUrl: './vendor-find-investor.component.html',
  styleUrls: ['./vendor-find-investor.component.scss']
})
export class VendorFindInvestorComponent implements OnInit {
  // projects: VendorProject[] = [...responseProjects.projectsList, ...responseProjects.projectsList];
  projects: VendorProject[] = [];
  self = 'VendorFindInvestorComponent';
  selected = 'all'; // group/single
  selectedProject: VendorProject;
  searchName = '';

  constructor(private filteredProjectsService: FilteredProjectsService, private stateService: StateService, private chatsCacheService: ChatsCacheService) {
  }

  ngOnInit() {
    this.filteredProjectsService.searchByKeyword('', 1000, 1).subscribe(
      (filteredProjects: FilteredProjects) => {
        this.projects = filteredProjects.projectsList;
        this.selectedProject = this.projects[0];
        this.stateService.selectedProjectForChat$.next(this.selectedProject);
        for (let i = 0; i < this.projects.length; i++) {
          this.getChatByProject(this.projects[i]);
        }
      },
      err => {
        console.warn(err);
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

  findByNameClick() {
    this.filteredProjectsService.searchByKeyword(this.searchName, 1000, 1).subscribe(
      (filteredProjects: FilteredProjects) => {
        this.projects = filteredProjects.projectsList;
        for (let i = 0; i < this.projects.length; i++) {
          this.getChatByProject(this.projects[i]);
        }
      },
      err => {
        console.warn(err);
      }
    );
  }

  getChatByProject(project: VendorProject) {
    this.chatsCacheService.getData(project.id.toString()).subscribe(
      (chat: Chat) => {
        if (chat != null) {
          project.chat = chat;
          // message.participant = participant;
          console.log(project.chat.conversationType);
        }
      }
    );
  }

  allowedCards(project: VendorProject): boolean { // all/single/group
    if (this.selected === 'all') {
      return true;
    }
    // if (this.selected === 'all') {
    //   return true;
    // }
    if (project.chat.conversationType === 'All2All' && this.selected === 'group') {
      return true;
    }
    if (project.chat.conversationType === 'P2P' && this.selected === 'single') {
      return true;
    }
    return false;
  }
}
