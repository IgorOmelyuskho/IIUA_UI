import { Component, OnInit } from '@angular/core';
import { GeoObjectEdit } from 'src/app/models/geoObjectEdit';

const tractor: GeoObjectEdit = {
  geoObjectId: 'ID-1',
  coords: { x: 35.026068784239214, y: 48.47780160404878 },
  zCoords: 0,
  editModeScale: 1.5,
  speed: 0.000008324 * 5,
  movedTo: null,
  projectName: 'tractor',
  pathToZip: window.location.origin + '/assets/objects/tractor.zip',
  pathToZipLP: window.location.origin + '/assets/objects/low-poly-tractor.zip',
  project: null,
  canMove: true,
  coordsArr: [
    { x: 35.033117654800435, y: 48.4748250766406 },
    { x: 35.03200185585024, y: 48.472200432851224 },
    { x: 35.03127229499819, y: 48.47265566535427 },
    { x: 35.024346831321736, y: 48.47404623309771 },
    { x: 35.026068784239214, y: 48.47780160404878 }
  ]
};

const building: GeoObjectEdit = {
  geoObjectId: 'ID-2',
  coords: { x: 35.025092314959764, y: 48.47446835017066 },
  zCoords: 0,
  editModeScale: 1,
  rotationZ: 0.279,
  projectName: 'building',
  pathToZip: window.location.origin + '/assets/objects/building.zip',
  pathToZipLP: window.location.origin + '/assets/objects/low-poly-building.zip',
  project: null,
  canMove: false
};

const helicopter: GeoObjectEdit = {
  geoObjectId: 'ID-3',
  coords: { x: 35.021092314959764, y: 48.47446835017066 },
  zCoords: 4,
  editModeScale: 0.3,
  speed: 0.000008324,
  projectName: 'helicopter',
  pathToZip: window.location.origin + '/assets/objects/helicopter.zip',
  pathToZipLP: window.location.origin + '/assets/objects/helicopter.zip',
  project: null,
  canMove: true
};

const helicopter2: GeoObjectEdit = {
  geoObjectId: 'ID-4',
  coords: { 'x': 35.00264769160458, 'y': 48.46845884057487 },
  zCoords: 5,
  editModeScale: 0.3 * 5,
  speed: 0.000008324 * 9,
  projectName: 'helicopter2',
  pathToZip: window.location.origin + '/assets/objects/helicopter2.zip',
  pathToZipLP: window.location.origin + '/assets/objects/helicopter2.zip',
  project: null,
  canMove: true,
  coordsArr: [
    { 'x': 35.04689341151425, 'y': 48.46777593381037 },
    { 'x': 35.034962945816005, 'y': 48.47511669993176 },
    { 'x': 35.001488977310146, 'y': 48.48447605882839 },
    { 'x': 35.00264769160458, 'y': 48.46845884057487 }
  ]
};

const airplane: GeoObjectEdit = {
  geoObjectId: 'ID-5',
  coords: { 'x': 35.01109135437014, 'y': 48.458505983752076 },
  zCoords: 5,
  editModeScale: 0.075 * 5,
  speed: 0.000008324 * 15,
  projectName: 'airplane',
  pathToZip: window.location.origin + '/assets/objects/airplane.zip',
  pathToZipLP: window.location.origin + '/assets/objects/airplane.zip',
  project: null,
  canMove: true,
  coordsArr: [
    { 'x': 35.04306328582766, 'y': 48.49074073912291 },
    { 'x': 35.01109135437014, 'y': 48.458505983752076 }
  ]
};

const building2: GeoObjectEdit = {
  geoObjectId: 'ID-6',
  coords: { x: 35.02542231495987, y: 48.475268350170914 },
  zCoords: 0,
  editModeScale: 1,
  rotationZ: 0.2789,
  projectName: 'building2',
  pathToZip: window.location.origin + '/assets/objects/building.zip',
  pathToZipLP: window.location.origin + '/assets/objects/low-poly-building.zip',
  project: null,
  canMove: false
};

const buildings3: GeoObjectEdit = {
  geoObjectId: 'ID-7',
  coords: { x: 35.02908000000098, y: 48.47371835017042 },
  zCoords: 0,
  editModeScale: 100,
  rotationZ: 0.2789,
  projectName: 'buildings3',
  pathToZip: window.location.origin + '/assets/objects/buildings3.zip',
  pathToZipLP: window.location.origin + '/assets/objects/low-poly-building.zip',
  project: null,
  canMove: false
};

const tractor2: GeoObjectEdit = {
  geoObjectId: 'ID-8',
  coords: { x: 35.02432537364962, y: 48.47404978948825 },
  zCoords: 0,
  editModeScale: 1.5,
  speed: 0.000008324 * 5,
  movedTo: null,
  projectName: 'tractor2',
  pathToZip: window.location.origin + '/assets/objects/tractor.zip',
  pathToZipLP: window.location.origin + '/assets/objects/low-poly-tractor.zip',
  project: null,
  canMove: true,
  coordsArr: [
    { x: 35.02384257602694, y: 48.47414936831771 },
    { x: 35.02548408794405, y: 48.47803279022733 },
    { x: 35.02599907207491, y: 48.47781231086228 },
    { x: 35.02432537364962, y: 48.47404978948825 },
  ]
};

@Component({
  selector: 'app-map-edit-mode',
  templateUrl: './map-edit-mode.component.html',
  styleUrls: ['./map-edit-mode.component.scss']
})
export class MapEditModeComponent implements OnInit {
  mapObjects: GeoObjectEdit[];

  constructor() { }

  ngOnInit() {
  }

  onMapFinishInit() {
    const delta = 0.005;
    const newGeoObjects: GeoObjectEdit[] = [tractor, building, building2, tractor2, airplane, helicopter2, /* helicopter, */ buildings3];
    // for (let i = 0; i < newGeoObjects.length; i++) {
    //   newGeoObjects[i].coords = { x: 35.028 + Math.random() * delta, y: 48.474 + Math.random() * delta };
    // }
    this.mapObjects = newGeoObjects;
  }

  onObjectClick(geoObject: GeoObjectEdit) {
    console.log(geoObject);
  }
}
