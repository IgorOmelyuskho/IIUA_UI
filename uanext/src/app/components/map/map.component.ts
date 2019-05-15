import { Component, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
// import { Map } from './map4';
import {
  mapInit,
  mapDestroy,
  mapSetProject,
  mapAddNewPolygons,
  mapSetFullScreen,
  mapReplacePolygons,
  mapAddNewObjects,
  mapReplaceObjects,
  setObjectClickCallback,
  setObjectHoverCallback,
} from './map4-no-class';
import { polygon1, polygon2, female, male, tractor, walt } from 'src/app/helperClasses/projects';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() objectClick = new EventEmitter<any>();
  @Output() objectHover = new EventEmitter<any>();
  @Output() mapFinishInit = new EventEmitter<any>();

  @Input()
  set changeSelectedProject(project: any) {
    if (project != null) {
      mapSetProject(project);
    }
  }

  @Input()
  set replace3DObjects(objects: any[]) {
    if (objects != null && objects.length > 0) {
      mapReplaceObjects(objects);
    }
  }

  timeOut1: any;
  timeOut2: any;
  timeOut3: any;
  timeOut4: any;
  timeOut5: any;

  hubConnection: HubConnection;

  // map: Map = null;

  clickObjectCallback: Function = (object: any) => {
    this.objectClick.emit(object);
  }

  hoverObjectCallback: Function = (object: any) => {
    this.objectHover.emit(object);
  }

  mapFinishInitCallback: Function = () => {
    this.mapFinishInit.emit();
    this.signalRConnect();
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.map = new Map();
    mapInit(this.mapFinishInitCallback);
    setObjectClickCallback(this.clickObjectCallback);
    setObjectHoverCallback(this.hoverObjectCallback);

    this.timeOut1 = setTimeout(() => {
      mapAddNewPolygons([polygon1]);
    }, 1000);

    this.timeOut2 = setTimeout(() => {
      mapReplacePolygons([polygon1, polygon2]);
    }, 1500);

    this.timeOut3 = setTimeout(() => {
      mapReplaceObjects([female, male]);
      // mapAddNewObjects([female, male]);
    }, 1500);

    this.timeOut4 = setTimeout(() => {
      mapReplaceObjects([tractor, walt]);
    }, 10000);

    // this.timeOut5 = setTimeout(() => {
    //   mapSetFullScreen();
    // }, 5000);
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
        environment.signalR,
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

  ngOnDestroy() {
    // if use http - clear http request
    clearTimeout(this.timeOut1);
    clearTimeout(this.timeOut2);
    clearTimeout(this.timeOut3);
    clearTimeout(this.timeOut4);
    clearTimeout(this.timeOut5);

    // this.map.mapDestroy();
    mapDestroy();
  }

}
