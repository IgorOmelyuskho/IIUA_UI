import { Component, OnInit } from '@angular/core';
import { ViewProjectsService } from 'src/app/services/viewProjects/view-projects.service';
import { ViewVendorProject } from 'src/app/models/viewVendorProject';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {

  project: ViewVendorProject = null;
  projectId: string;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private viewProjectsService: ViewProjectsService, private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    if (this.viewProjectsService.projectForView == null) {
      // use when page reload
      this.getProjectFromServer();
    } else {
      // else if navigate from projects
      this.getProjectFromService();
    }

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }

  downloadFile(file) { // todo download attribute only works for same-origin URLs.
    const a = document.createElement('a');
    a.href = file.url;
    a.download = file.url.split('/').pop();
    a.download = file.url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  setGalleryImages(images) {
    const imagesArr = [];
    for (let i = 0; i < images.length; i++) {
      const item = { small: images[i].url, medium: images[i].url, big: images[i].url };
      imagesArr.push(item);
    }

    this.galleryImages = imagesArr;
  }

  getProjectFromServer() {
    const arrLength: number = this.activateRoute.url['value'].length;
    this.projectId = this.activateRoute.url['value'][arrLength - 1].path;

    this.viewProjectsService.fetchProjectById(this.projectId).subscribe(
      (project: ViewVendorProject) => {
        this.project = project;
        console.log(this.project);
        this.setGalleryImages(this.project.images);
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
