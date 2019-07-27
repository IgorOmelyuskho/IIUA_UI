import { Component, OnInit } from '@angular/core';
import { responseProjects } from '../../../helperClasses/projects';
import { VendorProject } from 'src/app/models/vendorProject';
import { FilteredProjectsService } from 'src/app/services/http/filtered-projects.service';
import { FilteredProjects } from 'src/app/models';

@Component({
  selector: 'app-investor-last-activity',
  templateUrl: './investor-last-activity.component.html',
  styleUrls: ['./investor-last-activity.component.scss']
})
export class InvestorLastActivityComponent implements OnInit {
  // projects: VendorProject[] = [...responseProjects.projectsList, ...responseProjects.projectsList];
  projects: VendorProject[] = [];

  constructor(private filteredProjectsService: FilteredProjectsService) { }

  ngOnInit() {
    this.filteredProjectsService.searchByFilter().subscribe(
      (val: FilteredProjects) => {
        this.projects = val.projectsList;
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

}
