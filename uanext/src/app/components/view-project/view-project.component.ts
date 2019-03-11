import { Component, OnInit } from '@angular/core';
import { ViewProjectsService } from 'src/app/services/viewProjects/view-projects.service';
import { ViewVendorProject } from 'src/app/models/viewVendorProject';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {

  project: ViewVendorProject = null;
  projectId: string;

  constructor(private viewProjectsService: ViewProjectsService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.viewProjectsService.projectForView == null) {
      // use when page reload
      this.getProjectFromServer();
    } else {
      // else if navigate from projects
      this.getProjectFromService();
    }
  }

  getProjectFromServer() {
    const arrLength: number = this.activateRoute.url['value'].length;
    this.projectId = this.activateRoute.url['value'][arrLength - 1].path;

    this.viewProjectsService.fetchProjectById(this.projectId).subscribe(
      (project: ViewVendorProject) => {
        this.project = project;
        console.log(this.project);
      },
      err => {
        console.warn(err);
      }
    );
  }

  getProjectFromService() {
    this.project = this.viewProjectsService.projectForView;
    console.log(this.project);
  }

}
