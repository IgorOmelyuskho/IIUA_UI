import { Component, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { MapManager } from './mapDemoManager';
import { polygon1, polygon2, female, male, tractor, walt, female2 } from 'src/app/helperClasses/projects';
import { environment } from 'src/environments/environment';
import { VendorProject } from 'src/app/models/vendorProject';
import { SignalRService } from 'src/app/services/signal-r.service';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GeoObjectEdit } from 'src/app/models/geoObjectEdit';

@Component({
  selector: 'app-map-demo',
  templateUrl: './map-demo.component.html',
  styleUrls: ['./map-demo.component.scss']
})
export class MapDemoComponent implements OnInit, AfterViewInit, OnDestroy  {
  @Output() objectClick = new EventEmitter<GeoObjectEdit>();
  @Output() objectHover = new EventEmitter<GeoObjectEdit>();
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
  set replace3DObjects(objects: GeoObjectEdit[]) {
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
      console.error(e);
    }

  }

  timeOut1: any;
  timeOut2: any;
  timeOut3: any;
  timeOut4: any;
  timeOut5: any;
  timeOut6: any;

  $fromChangeExtentEvent: BehaviorSubject<any> = new BehaviorSubject(null);

  clickObjectCallback: Function = (object: GeoObjectEdit) => {
    this.objectClick.emit(object);
  }

  hoverObjectCallback: Function = (object: GeoObjectEdit) => {
    this.objectHover.emit(object);
  }

  mapFinishInitCallback: Function = () => {
    this.mapFinishInit.emit();
    this.$fromChangeExtentEvent.next(this.mapManager.getExtent());
    // this.signalRService.signalRConnect(this.mapManager.signalRMessage); // or connect when sign in ?
  }

  changeExtentCallback: Function = (extent: any) => {
    this.$fromChangeExtentEvent.next(extent);
  }

  constructor(private signalRService: SignalRService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapManager = new MapManager(
      this.mapFinishInitCallback,
      {
        mapWrapperId: 'map-wrapper-html-element-id-12345',
        mapId: 'map-html-element-id-12345',
        labelRendererId: 'label-renderer-12345'
      }
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
