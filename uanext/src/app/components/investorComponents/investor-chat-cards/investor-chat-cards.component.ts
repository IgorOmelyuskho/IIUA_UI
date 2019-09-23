import { Component, OnInit } from '@angular/core';
import { responseProjects } from '../../../helperClasses/projects';
import { VendorProject } from 'src/app/models/vendorProject';
import { FilteredProjectsService } from 'src/app/services/http/filtered-projects.service';
import { FilteredProjects } from 'src/app/models';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-investor-chat-cards',
  templateUrl: './investor-chat-cards.component.html',
  styleUrls: ['./investor-chat-cards.component.scss']
})
export class InvestorLastActivityComponent implements OnInit {
  // projects: VendorProject[] = [...responseProjects.projectsList, ...responseProjects.projectsList];
  projects: VendorProject[] = [];
  self = 'InvestorLastActivityComponent';
  selected = 'all'; // group/single
  selectedProject: VendorProject;
  searchName = '';

  constructor(private filteredProjectsService: FilteredProjectsService, private stateService: StateService) {
  }

  ngOnInit() {
    this.filteredProjectsService.searchByKeyword('', 1000, 1).subscribe(
      (filteredProjects: FilteredProjects) => {
        this.projects = filteredProjects.projectsList;
        this.selectedProject = this.projects[0];
        this.stateService.selectedProjectForChat$.next(this.selectedProject);
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
      },
      err => {
        console.warn(err);
      }
    );
  }
}
