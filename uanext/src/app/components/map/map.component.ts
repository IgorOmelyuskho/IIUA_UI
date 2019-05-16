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
  signalRMessage
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
  timeOut6: any;

  hubConnection: HubConnection;

  objectsArr: any[] = [ // todo - remove (use for emulate signalR)
    {
      object3DId: '0',
      positionX: 13.417122340477,
      positionY: 52.5281344784827
    },
    {
      object3DId: '1',
      positionX: 13.417222340477,
      positionY: 52.5282344784827
    },
    {
      object3DId: '2',
      positionX: 13.417322340477,
      positionY: 52.5283344784827
    },
    {
      object3DId: '3',
      positionX: 13.417422340477,
      positionY: 52.5284344784827
    }
  ];

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

    this.timeOut1 = setTimeout(() => {
      mapAddNewPolygons([polygon1]);
    }, 1000);

    this.timeOut2 = setTimeout(() => {
      mapReplacePolygons([polygon1, polygon2]);
    }, 1500);

    this.timeOut3 = setTimeout(() => {
      mapReplaceObjects([female, male, tractor, walt]);
      // mapReplaceObjects([female, male]);
      // mapAddNewObjects([female, male]);
    }, 2500);

    this.timeOut4 = setTimeout(() => {
      // mapReplaceObjects([tractor, walt]);
    }, 10000);

    // this.timeOut5 = setTimeout(() => {
    //   mapSetFullScreen();
    // }, 5000);

    // emulate signalR
    this.timeOut6 = setInterval(() => {
      for (let i = 0; i < this.objectsArr.length; i++) {
        this.objectsArr[i].positionX = this.objectsArr[i].positionX + Math.random() * 0.001 - Math.random() * 0.001;
        this.objectsArr[i].positionY = this.objectsArr[i].positionY + Math.random() * 0.001 - Math.random() * 0.001;

        const message: { object3DId: string, positionX: number, positionY: number } = {
          object3DId: this.objectsArr[i].object3DId,
          positionX: this.objectsArr[i].positionX,
          positionY: this.objectsArr[i].positionY
        };

        signalRMessage(message);
      }
    }, 3500);
  }

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.map = new Map();
    mapInit(this.mapFinishInitCallback);
    setObjectClickCallback(this.clickObjectCallback);
    setObjectHoverCallback(this.hoverObjectCallback);
  }

  signalRConnect() { // todo dispose
    const token = localStorage.getItem('token');
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(
        environment.signalR,
        {
          accessTokenFactory: () => token
        })
      .build();

    this.hubConnection.on('HistoryPositionSBEvent', function (message) {
      console.log(message);
    });

    // todo remove ?
    this.hubConnection.start()
      .then(function () {
        console.log('START');
      })
      .catch(function (err) {
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
    clearTimeout(this.timeOut6);

    // this.map.mapDestroy();
    mapDestroy();
  }

}
