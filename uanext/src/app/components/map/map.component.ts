import { Component, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { MapManager } from './mapManager';
import { polygon1, polygon2, female, male, tractor, walt, female2 } from 'src/app/helperClasses/projects';
import { environment } from 'src/environments/environment';
import { VendorProject } from 'src/app/models/vendorProject';
import { GeoObject } from 'src/app/models';
import { SignalRService } from 'src/app/services/signal-r.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() objectClick = new EventEmitter<GeoObject>();
  @Output() objectHover = new EventEmitter<GeoObject>();
  @Output() mapFinishInit = new EventEmitter<void>();

  mapManager: MapManager;

  @Input()
  set changeSelectedProject(project: VendorProject) {
    if (project != null && this.mapManager != null) {
      this.mapManager.mapSetProject(project);
    }
  }

  @Input()
  set replace3DObjects(objects: GeoObject[]) {
    if (objects != null && this.mapManager != null) {
      this.mapManager.mapReplaceObjects(objects);
    }
  }

  timeOut1: any;
  timeOut2: any;
  timeOut3: any;
  timeOut4: any;
  timeOut5: any;
  timeOut6: any;

  clickObjectCallback: Function = (object: GeoObject) => {
    this.objectClick.emit(object);
  }

  hoverObjectCallback: Function = (object: GeoObject) => {
    this.objectHover.emit(object);
  }

  mapFinishInitCallback: Function = () => {
    this.mapFinishInit.emit();
    this.signalRService.signalRConnect(this.mapManager.signalRMessage); // or connect when sign in ?

    this.timeOut1 = setTimeout(() => {
      this.mapManager.mapAddNewPolygons([polygon1]);
    }, 10);

    this.timeOut2 = setTimeout(() => {
      this.mapManager.mapReplacePolygons([polygon1, polygon2]);
    }, 15);

    this.timeOut5 = setTimeout(() => {
      this.mapManager.mapAddNewObjects([female2]);
    }, 10);

    this.timeOut3 = setTimeout(() => {
      this.mapManager.mapReplaceObjects([female, male, tractor, walt]); // if add object - add new object in signalRService
      // mapReplaceObjects([female, male]);
      // mapAddNewObjects([female, male]);
    }, 25);

    this.timeOut4 = setTimeout(() => {
      // mapReplaceObjects([tractor, walt]);
    }, 10000);

    // this.timeOut5 = setTimeout(() => {
    //   mapSetFullScreen();
    // }, 5000);
  }

  constructor(private signalRService: SignalRService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapManager = new MapManager(
      this.mapFinishInitCallback,
      {
        mapWrapperId: 'map-wrapper-html-element-id-3585349',
        mapId: 'map-html-element-id-495367235',
        labelRendererId: 'label-renderer-843744329'
      }
    );

    this.mapManager.setObjectClickCallback(this.clickObjectCallback);
    this.mapManager.setObjectHoverCallback(this.hoverObjectCallback);
  }

  ngOnDestroy() {
    // if use http - clear http request
    clearTimeout(this.timeOut1);
    clearTimeout(this.timeOut2);
    clearTimeout(this.timeOut3);
    clearTimeout(this.timeOut4);
    clearTimeout(this.timeOut5);
    clearTimeout(this.timeOut6);
    this.signalRService.signalRDisconnect();

    this.mapManager.mapDestroy();
  }

}
