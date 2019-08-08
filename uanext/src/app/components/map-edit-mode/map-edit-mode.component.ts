import { Component, OnInit } from '@angular/core';
import { GeoObject } from 'src/app/models';

 const tractor: GeoObject = {
  geoObjectId: 'ID-tractor',
  coords: {x: 0, y: 0 },
  zCoords: 0,
  projectName: 'name1',
  pathToZip: window.location.origin + '/assets/objects/tractor.zip',
  pathToZipLP: window.location.origin + '/assets/objects/low-poly-tractor.zip',
  project: null,
  canMove: true
};

 const building: GeoObject = {
  geoObjectId: 'ID-2',
  coords: {x: 0, y: 0 },
  zCoords: 0,
  projectName: 'name2',
  pathToZip: window.location.origin + '/assets/objects/building.zip',
  pathToZipLP: window.location.origin + '/assets/objects/low-poly-building.zip',
  project: null,
  canMove: false
};

const helicopter: GeoObject = {
  geoObjectId: 'ID-3',
  coords: {x: 0, y: 0 },
  zCoords: 4,
  projectName: 'name3',
  pathToZip: window.location.origin + '/assets/objects/helicopter.zip',
  pathToZipLP: window.location.origin + '/assets/objects/helicopter.zip',
  project: null,
  canMove: true
};

const helicopter2: GeoObject = {
  geoObjectId: 'ID-4',
  coords: {x: 0, y: 0 },
  zCoords: 4,
  projectName: 'name4',
  pathToZip: window.location.origin + '/assets/objects/helicopter2.zip',
  pathToZipLP: window.location.origin + '/assets/objects/helicopter2.zip',
  project: null,
  canMove: true
};

const airplane: GeoObject = {
  geoObjectId: 'ID-5',
  coords: {x: 0, y: 0 },
  zCoords: 4,
  projectName: 'name5',
  pathToZip: window.location.origin + '/assets/objects/airplane.zip',
  pathToZipLP: window.location.origin + '/assets/objects/airplane.zip',
  project: null,
  canMove: true
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
    const newGeoObjects: GeoObject[] = [tractor, building, helicopter, helicopter2, airplane];
    for (let i = 0; i < newGeoObjects.length; i++) {
      newGeoObjects[i].coords = { x: 35.028 + Math.random() * delta, y: 48.474 + Math.random() * delta };
    }
    this.mapObjects = newGeoObjects;
  }

  onObjectClick(geoObject: GeoObject) {
    console.log(geoObject);
  }
}
