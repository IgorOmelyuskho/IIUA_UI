import { Component, OnInit } from '@angular/core';
import { ViewProjectsService } from 'src/app/services/viewProjects/view-projects.service';
import { ViewVendorProject } from 'src/app/models/viewVendorProject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-vendor-projects',
  templateUrl: './view-vendor-projects.component.html',
  styleUrls: ['./view-vendor-projects.component.scss']
})
export class ViewVendorProjectsComponent implements OnInit {

  projects: ViewVendorProject[] = [];

  constructor(private viewProjectsService: ViewProjectsService, private router: Router) { }

  ngOnInit() {
    this.viewProjectsService.fetchProjects({filterData1: 1, filterData2: 2}).subscribe(
      (projects: ViewVendorProject[]) => {
        console.log(projects);
        this.projects = projects;
      },
      err => {
        console.warn(err);
      }
    );
  }

  goToProject(project: ViewVendorProject) {
    this.viewProjectsService.projectForView = project;
    this.router.navigate(['home', 'investor', 'project', project.id]);
  }

}
