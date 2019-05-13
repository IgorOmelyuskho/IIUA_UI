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
import { polygon1, polygon2, female, male, tractor, walt } from 'src/app/services/helperServices/projects';

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

  // map: Map = null;

  clickObjectCallback: Function = (object: any) => {
    this.objectClick.emit(object);
  }

  hoverObjectCallback: Function = (object: any) => {
    this.objectHover.emit(object);
  }

  mapFinishInitCallback: Function = () => {
    console.log('MAP FINISH INIT');
    this.mapFinishInit.emit();
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
    }, 100);

    this.timeOut2 = setTimeout(() => {
      mapReplacePolygons([polygon1, polygon2]);
    }, 500);

    this.timeOut3 = setTimeout(() => {
      mapAddNewObjects([female, male, tractor, walt]);
    }, 500);

    // this.timeOut4 = setTimeout(() => {
    //   mapReplaceObjects([object1, object2]);
    // }, 8000);

    // this.timeOut5 = setTimeout(() => {
    //   mapSetFullScreen();
    // }, 5000);
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
