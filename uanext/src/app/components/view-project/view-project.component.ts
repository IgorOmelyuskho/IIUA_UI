
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FilteredProjectsService } from 'src/app/services/http/filtered-projects.service';
import { VendorProject } from 'src/app/models/vendorProject';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FilteredProjects } from 'src/app/models/index.js';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from 'src/environments/environment.js';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit, AfterViewInit, OnDestroy {
  project: VendorProject = null;
  projectId: string;
  self = 'ViewProjectComponent';
  @ViewChild('container') container: ElementRef;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  private hubConnection: HubConnection;

  constructor(
    private filteredProjectsService: FilteredProjectsService,
    private activateRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    // this.signalRConnect();

    if (this.filteredProjectsService.projectForView == null) {
      // use when page reload
      this.getProjectFromServer();
    } else {
      // else if navigate from projects
      this.getProjectFromService();
    }

    this.galleryOptions = [
      {
        preview: true,
        width: '600px',
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

  videoUrlToSafe(videos: any[]) {
    for (let i = 0; i < videos.length; i++) {
      let url = videos[i]['url'].replace('watch?v=', 'embed/');
      if (url.includes('https://www.youtube.com') === false) {
        videos[i].safeVideoUrl = false;
        continue;
      }
      url = url.split('&')[0];
      videos[i].safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  getProjectFromServer() {
    const arrLength: number = this.activateRoute.url['value'].length;
    this.projectId = this.activateRoute.url['value'][arrLength - 1].path;

    this.filteredProjectsService.searchByFilter({}).subscribe(
      (filteringProjects: FilteredProjects) => {
        for (let i = 0; i < filteringProjects.projectsList.length; i++) {
          if (filteringProjects.projectsList[i].id === this.projectId) {
            this.project = filteringProjects.projectsList[i];
            this.videoUrlToSafe(this.project.videos);
            this.setGalleryImages(this.project.images);
            return;
          }
        }
      },
      err => {
        console.warn(err);
      }
    );
  }

  getProjectFromService() {
    this.project = this.filteredProjectsService.projectForView;
    this.videoUrlToSafe(this.project.videos);
    this.setGalleryImages(this.project.images);
  }

  previewOpenHandler() {
    this.container.nativeElement.style.zIndex = '1000000';
    this.container.nativeElement.style.position = 'relative';
  }

  previewCloseHandler() {
    this.container.nativeElement.style.zIndex = '1';
    this.container.nativeElement.style.position = '';
  }

  ngOnDestroy() {
  }

}
