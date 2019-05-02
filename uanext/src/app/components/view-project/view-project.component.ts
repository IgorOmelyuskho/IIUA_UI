
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ViewProjectsService } from 'src/app/services/viewProjects/view-projects.service';
import { ViewVendorProject } from 'src/app/models/viewVendorProject';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { init, destroy } from './map.js';
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
  project: ViewVendorProject = null;
  projectId: string;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  private hubConnection: HubConnection;

  constructor(
    private viewProjectsService: ViewProjectsService,
    private activateRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    // this.signalRConnect();

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
    if (this.project != null) {
      init(this.project); // 2 init
    }
  }

  signalRConnect() {
    const token = localStorage.getItem('token');

    // this.hubConnection = new HubConnectionBuilder()
    //   // .withUrl(environment.signalR)
    //   .withUrl('http://proxy.alexduxa.online/notifications/chatHub', {
    //     accessTokenFactory: () => token
    //   })
    //   .build();

    // this.hubConnection
    //   .start()
    //   .then(() => console.log('Connection started!'))
    //   .catch(err => console.warn(err));

    // this.hubConnection.on('BroadcastMessage', (type: string, payload: string) => {
    //   console.log('BroadcastMessage: ', type, payload);
    // });

    // this.hubConnection.on('ReceiveMessage', (message: string) => {
    //   console.log('ReceiveMessage: ', message);
    // });

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(
        'http://proxy.alexduxa.online/notifications/chatHub',
        {
          accessTokenFactory: () => token + ''
        })
      .build();

    this.hubConnection.on('ReceiveMessage', function (message) {
      console.log(message);
    });

    this.hubConnection.start().then(function () {
      console.log('START');
    }).catch(function (err) {
      console.error(err.toString());
      return;
    });
  }

  signalRSendMsg() {
    // connection.invoke("SendMessage", message).catch(function (err) {
    this.hubConnection.invoke('SendMessage')
      .catch(function (err) {
        console.error(err.toString());
        return;
      });
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

    this.viewProjectsService.searchByFilter({}).subscribe(
      (filteringProjects: FilteredProjects) => {
        for (let i = 0; i < filteringProjects.projectsList.length; i++) {
          if (filteringProjects.projectsList[i].id === parseInt(this.projectId, 10)) {
            this.project = filteringProjects.projectsList[i];
            console.log(this.project);
            this.videoUrlToSafe(this.project.videos);
            this.setGalleryImages(this.project.images);
            requestAnimationFrame(() => {
              init(this.project); // 2 init
            });
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
    this.project = this.viewProjectsService.projectForView;
    console.log(this.project);
    this.videoUrlToSafe(this.project.videos);
    this.setGalleryImages(this.project.images);
  }

  ngOnDestroy() {
    destroy();
  }

}
