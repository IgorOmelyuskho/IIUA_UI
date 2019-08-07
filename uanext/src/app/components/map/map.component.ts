import { Component, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { MapManager } from './mapManager';
import { polygon1, polygon2, female, male, tractor, walt, female2 } from 'src/app/helperClasses/projects';
import { environment } from 'src/environments/environment';
import { VendorProject } from 'src/app/models/vendorProject';
import { GeoObject } from 'src/app/models';
import { SignalRService } from 'src/app/services/signal-r.service';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() objectClick = new EventEmitter<GeoObject>();
  @Output() objectHover = new EventEmitter<GeoObject>();
  @Output() mapFinishInit = new EventEmitter<void>();
  @Output() changeExtent = new EventEmitter<any>();

  mapManager: MapManager;

  @Input() editMode = false;

  @Input()
  set changeSelectedProject(project: VendorProject) {
    if (project != null && this.mapManager != null) {
      // this.mapManager.mapSetProject(project);
    }
  }

  @Input()
  set replace3DObjects(objects: GeoObject[]) {
    try {
      if (objects != null && this.mapManager != null) {
        console.log(objects);
        this.mapManager.mapReplaceObjects(objects);

        this.signalRService.objectsArr = objects.map((obj) => { // todo remove
          return {
            object3DId: obj.geoObjectId,
            positionX: obj.coords.x,
            positionY: obj.coords.y,
            canMove: obj.canMove
          };
        });
      }
    } catch (e) {
      console.log(e);
    }

  }

  timeOut1: any;
  timeOut2: any;
  timeOut3: any;
  timeOut4: any;
  timeOut5: any;
  timeOut6: any;

  $fromChangeExtentEvent: BehaviorSubject<any> = new BehaviorSubject(null);

  clickObjectCallback: Function = (object: GeoObject) => {
    this.objectClick.emit(object);
  }

  hoverObjectCallback: Function = (object: GeoObject) => {
    this.objectHover.emit(object);
  }

  mapFinishInitCallback: Function = () => {
    this.mapFinishInit.emit();
    this.$fromChangeExtentEvent.next(this.mapManager.getExtent());
    this.signalRService.signalRConnect(this.mapManager.signalRMessage); // or connect when sign in ?

    this.timeOut1 = setTimeout(() => {
      // this.mapManager.mapAddNewPolygons([polygon1]);
    }, 10);

    this.timeOut2 = setTimeout(() => {
      // this.mapManager.mapReplacePolygons([polygon1, polygon2]);
    }, 15);

    this.timeOut5 = setTimeout(() => {
      // this.mapManager.mapAddNewObjects([female2]);
    }, 10);

    this.timeOut3 = setTimeout(() => {
      // this.mapManager.mapReplaceObjects([female, male, tractor, walt]); // if add object - add new object in signalRService
      // mapReplaceObjects([female, male]);
      // mapAddNewObjects([female, male]);
    }, 7500);

    this.timeOut4 = setTimeout(() => {
      // mapReplaceObjects([tractor, walt]);
    }, 10000);

    // this.timeOut5 = setTimeout(() => {
    //   mapSetFullScreen();
    // }, 5000);
  }

  changeExtentCallback: Function = (extent: any) => {
    this.$fromChangeExtentEvent.next(extent);
  }

  constructor(private signalRService: SignalRService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('MAP EDIT MODE = ', this.editMode);
    this.mapManager = new MapManager(
      this.mapFinishInitCallback,
      {
        mapWrapperId: 'map-wrapper-html-element-id-3585349',
        mapId: 'map-html-element-id-495367235',
        labelRendererId: 'label-renderer-843744329'
      },
      this.editMode
    );

    this.mapManager.setObjectClickCallback(this.clickObjectCallback);
    this.mapManager.setObjectHoverCallback(this.hoverObjectCallback);
    this.mapManager.setChangeExtentCallback(this.changeExtentCallback);

    this.$fromChangeExtentEvent
      .pipe(
        debounceTime(800),
      )
      .subscribe(
        (extent: any) => {
          if (extent != null) {
            this.changeExtent.emit(extent);
          }
        }
      );
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
