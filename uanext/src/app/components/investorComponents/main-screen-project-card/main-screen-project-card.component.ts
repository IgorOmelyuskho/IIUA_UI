import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-main-screen-project-card',
  templateUrl: './main-screen-project-card.component.html',
  styleUrls: ['./main-screen-project-card.component.scss']
})
export class MainScreenProjectCardComponent implements OnInit, AfterViewInit {
  _selectedProject: VendorProject;

  @ViewChild('projectCard') projectCard: ElementRef;

  @Input()
  set selectedProject(selectedProject: VendorProject) {
    if (selectedProject != null) {
      this._selectedProject = selectedProject;
      this.projectCard.nativeElement.style.display = '';
      this.setGalleryImages(this._selectedProject.images);
    }
  }

  selectedMenuItem = 'shared';

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor() { }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        thumbnailsMoveSize: 4
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

  ngAfterViewInit() {
    this.setGalleryImages(this._selectedProject.images);
  }

  setGalleryImages(images) {
    const imagesArr = [];
    for (let i = 0; i < images.length; i++) {
      const item = { small: images[i].url, medium: images[i].url, big: images[i].url };
      imagesArr.push(item);
    }

    this.galleryImages = imagesArr;
  }

  getAvatarUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

  hideSelectedProjectInfo() {
    this.projectCard.nativeElement.style.display = 'none';
  }

}
