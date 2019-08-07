import { Component, OnInit } from '@angular/core';
import { GeoObject } from 'src/app/models';

 const tractor: GeoObject = {
  geoObjectId: 'ID-1',
  coords: {x: 0, y: 0 },
  zCoords: 0,
  projectName: 'name1',
  pathToZip: window.location.origin + '/assets/objects/tractor.zip',
  pathToZip2: window.location.origin + '/assets/objects/low-poly-tractor.zip',
  project: null,
  canMove: true
};

 const building: GeoObject = {
  geoObjectId: 'ID-2',
  coords: {x: 0, y: 0 },
  zCoords: 0,
  projectName: 'name2',
  pathToZip: window.location.origin + '/assets/objects/building.zip',
  pathToZip2: window.location.origin + '/assets/objects/low-poly-building.zip',
  project: null,
  canMove: false
};

@Component({
  selector: 'app-map-edit-mode',
  templateUrl: './map-edit-mode.component.html',
  styleUrls: ['./map-edit-mode.component.scss']
})
export class MapEditModeComponent implements OnInit {
  mapObjects: GeoObject[];

  constructor() { }

  ngOnInit() {
  }

  onMapFinishInit() {
    const delta = 0.005;
    const newGeoObjects: GeoObject[] = [tractor, building];
    for (let i = 0; i < newGeoObjects.length; i++) {
      newGeoObjects[i].coords = { x: 35.028 + Math.random() * delta, y: 48.474 + Math.random() * delta };
    }
    this.mapObjects = newGeoObjects;
  }

  onObjectClick(geoObject: GeoObject) {
    console.log(geoObject);
  }
}
