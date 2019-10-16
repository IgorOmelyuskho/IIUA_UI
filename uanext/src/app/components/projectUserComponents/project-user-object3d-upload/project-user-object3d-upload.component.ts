import { Component, OnInit } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { FilesService } from 'src/app/services/http/files.service';
import { FilteredProjectsService } from 'src/app/services/http/filtered-projects.service';
import { MapService } from 'src/app/services/http/map.service';
import { FilteredProjects } from 'src/app/models';

@Component({
  selector: 'app-project-user-object3d-upload',
  templateUrl: './project-user-object3d-upload.component.html',
  styleUrls: ['./project-user-object3d-upload.component.scss']
})
export class ProjectUserObject3dUploadComponent implements OnInit {
  formData: FormData;
  fileForUpload: any;
  projects: VendorProject[];
  delta = 0.05;
  xCoord = 35.028;
  yCoord = 48.4747;
  xCoordinate = this.xCoord + Math.random() * this.delta;
  yCoordinate = this.yCoord + Math.random() * this.delta;
  zipUploaded = false;
  pathToZip: string;
  searchWord: string;
  projectId: string;

  constructor(
    private filesService: FilesService,
    private filteredProjectsService: FilteredProjectsService,
    private mapService: MapService
  ) { }

  ngOnInit() {
    this.filteredProjectsService.searchByFilter({ page: 1, pageSize: 10 }).subscribe(
      (val: FilteredProjects) => {
        this.projects = val.projectsList;
      },
      err => {
        console.warn(err);
      }
    );
  }

  filesChange(e) {
    this.fileForUpload = e.target['files'][0];
    this.zipUploaded = false;
  }

  uploadFile() {
    this.zipUploaded = false;

    if (this.fileForUpload == null) {
      return;
    }

    this.formData = new FormData();
    this.formData.append(this.fileForUpload.name, this.fileForUpload);

    this.filesService.uploadFiles(this.formData).subscribe(
      response => {
        this.zipUploaded = true;
        this.pathToZip = response[0].url;
      },
      err => {
        console.warn(err);
      }
    );
  }

  createGeoObject() {
    // this.mapService.post3DObject
  }

  searchByKeywordBtn(event) {
    this.searchProjectsByKeyword(this.searchWord, 10000, 1);
  }

  searchByKeywordInput(event) {
    if (event.target.value === '') {
      this.searchProjectsByKeyword(this.searchWord, 10000, 1);
    }
  }

  searchProjectsByKeyword(keyword: string, pageSize: number, pageNumber: number) {
    this.filteredProjectsService.searchByKeyword(keyword, pageSize, pageNumber)
      .subscribe(
        (filteringProjects: FilteredProjects) => {
          this.projects = filteringProjects.projectsList;
        },
        err => {
          console.warn(err);
        }
      );
  }

  projectWrapperClick(project: VendorProject, event: any) {
    this.xCoordinate = this.xCoord + Math.random() * this.delta;
    this.yCoordinate = this.yCoord + Math.random() * this.delta;

    this.projectId = project.id;
    const eventPath = event.path;

    const elements = document.querySelectorAll('.projects-container .project-wrapper');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('selected');
    }

    for (let i = 0; i < eventPath.length; i++) {
      if (eventPath[i].querySelector('.project-wrapper') != null) {
        eventPath[i - 1].classList.add('selected');
        return;
      }
    }
  }
}
