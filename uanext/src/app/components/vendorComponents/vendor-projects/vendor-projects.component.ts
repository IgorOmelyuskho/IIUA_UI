import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { VendorProject } from 'src/app/models/vendorProject';
import { ProjectsService } from 'src/app/services/http/projects.service';

@Component({
  selector: 'app-vendor-projects',
  templateUrl: './vendor-projects.component.html',
  styleUrls: ['./vendor-projects.component.scss']
})
export class VendorProjectsComponent implements OnInit {
  projects: VendorProject[] = [];
  isLoaded = false;

  constructor(private router: Router, private projectsService: ProjectsService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.projectsService.fetchVendorProjects().subscribe(
      (projects: VendorProject[]) => {
        this.projects = projects;
        this.isLoaded = true;
      },
      err => {
        console.warn(err);
        // user no have projects
        // if (err.error.error.code === 2) {
        //   this.projects = [];
        // }
        this.projects = [];
        this.isLoaded = true;
      }
    );
  }

  createNewProject() {
    this.router.navigate(['home', 'vendor', 'newProject']);
  }

  goToProject(project: VendorProject) {
    this.projectsService.projectForUpdate = project;
    this.router.navigate(['home', 'vendor', 'project', project.id]);
  }

}
