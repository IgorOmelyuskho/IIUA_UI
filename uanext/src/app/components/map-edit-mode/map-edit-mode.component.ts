import { Component, OnInit } from '@angular/core';
import { GeoObjectEdit } from 'src/app/models/geoObjectEdit';

const tractor: GeoObjectEdit = {
  geoObjectId: 'ID-1',
  coords: { x: 35.026068784239214, y: 48.47780160404878 },
  zCoords: 0,
  editModeScale: 0.5,
  speed: 0.000008324 * 1.7,
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

const helicopter2: GeoObjectEdit = {
  geoObjectId: 'ID-4',
  coords: { 'x': 35.00264769160458, 'y': 48.46845884057487 },
  zCoords: 5,
  editModeScale: 0.6,
  speed: 0.000008324 * 9,
  projectName: 'helicopter',
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
  editModeScale: 0.1,
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
  editModeScale: 0.5,
  speed: 0.000008324 * 1.7,
  movedTo: null,
  projectName: 'tractor',
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

const steelRoad: GeoObjectEdit = {
  geoObjectId: 'ID-9',
  coords: { x: 35.03274000000214, y: 48.476028350171156 },
  zCoords: 0,
  editModeScale: 10,
  rotationZ: 2.1488999999999985,
  projectName: 'steelRoad',
  pathToZip: window.location.origin + '/assets/objects/steel-road.zip',
  pathToZipLP: window.location.origin + '/assets/objects/steel-road.zip',
  project: null,
  canMove: false,
};

const train: GeoObjectEdit = {
  geoObjectId: 'ID-10',
  coords: { 'x': 35.03296879220011, 'y': 48.47593819757091 },
  zCoords: 0.005,
  editModeScale: 1.8,
  speed: 0.000008324 * 10,
  movedTo: null,
  projectName: 'train',
  pathToZip: window.location.origin + '/assets/objects/train.zip',
  pathToZipLP: window.location.origin + '/assets/objects/train.zip',
  project: null,
  canMove: true,
  coordsArr: [
    { 'x': 35.02123144555094, 'y': 48.481006500942584 },
    { 'x': 35.04181874084475, 'y': 48.4721070741185 },
    { 'x': 35.03296879220011, 'y': 48.47593819757091 }
  ]
};

const crane: GeoObjectEdit = {
  geoObjectId: 'ID-11',
  coords: { x: 35.02940000000108, y: 48.475808350171086 },
  zCoords: 0,
  editModeScale: 180,
  rotationZ: 1.0,
  projectName: 'crane',
  pathToZip: window.location.origin + '/assets/objects/crane.zip',
  pathToZipLP: window.location.origin + '/assets/objects/crane.zip',
  project: null,
  canMove: false,
  rotateSpeed: 0.01,
};

const buildings4: GeoObjectEdit = {
  geoObjectId: 'ID-12',
  coords: { x: 35.038125133654944, y: 48.47445000661591 },
  zCoords: -0.16,
  editModeScale: 1,
  rotationZ: 0.6589000000000003,
  projectName: 'buildings4',
  pathToZip: window.location.origin + '/assets/objects/buildings4.zip',
  pathToZipLP: window.location.origin + '/assets/objects/buildings4.zip',
  project: null,
  canMove: false,
};


const tractor3: GeoObjectEdit = {
  geoObjectId: 'ID-13',
  coords: { 'x': 35.04056357679542, 'y': 48.47100771984432 },
  zCoords: 0,
  editModeScale: 0.5,
  speed: 0.000008324 * 1.7,
  movedTo: null,
  projectName: 'tractor',
  pathToZip: window.location.origin + '/assets/objects/tractor.zip',
  pathToZipLP: window.location.origin + '/assets/objects/low-poly-tractor.zip',
  project: null,
  canMove: true,
  coordsArr: [
    { 'x': 35.040554001405326, 'y': 48.47100292985121 },
    { 'x': 35.03820477980889, 'y': 48.4689211183306 },
    { 'x': 35.03194321170781, 'y': 48.47224460836455 },
    { 'x': 35.031637213872045, 'y': 48.471995900780286 },
    { 'x': 35.03380390988559, 'y': 48.47081030329841 },
    { 'x': 35.03416528488617, 'y': 48.470461065960166 },
    { 'x': 35.03780081563286, 'y': 48.4685815407112 },
    { 'x': 35.04056357679542, 'y': 48.47100771984432 }
  ]
};

const airplane2: GeoObjectEdit = {
  geoObjectId: 'ID-14',
  coords: { 'x': 35.01576336741209, 'y': 48.48230575781761 },
  zCoords: 5,
  editModeScale: 0.1,
  speed: 0.000008324 * 15,
  projectName: 'airplane',
  pathToZip: window.location.origin + '/assets/objects/airplane.zip',
  pathToZipLP: window.location.origin + '/assets/objects/airplane.zip',
  project: null,
  canMove: true,
  coordsArr: [
    { 'x': 35.050998727796696, 'y': 48.46481034372212 },
    { 'x': 35.01576336741209, 'y': 48.48230575781761 }
  ]
};

const tractor4: GeoObjectEdit = {
  geoObjectId: 'ID-15',
  coords: { 'x': 35.03197206885113, 'y': 48.47227222618537 },
  zCoords: 0,
  editModeScale: 0.5,
  speed: 0.000008324 * 1.7,
  movedTo: null,
  projectName: 'tractor',
  pathToZip: window.location.origin + '/assets/objects/tractor.zip',
  pathToZipLP: window.location.origin + '/assets/objects/low-poly-tractor.zip',
  project: null,
  canMove: true,
  coordsArr: [
    { 'x': 35.031942840445254, 'y': 48.47225232140946 },
    { 'x': 35.0312706178463, 'y': 48.472622154838604 },
    { 'x': 35.03062610487132, 'y': 48.47284342389176 },
    { 'x': 35.027993687205026, 'y': 48.47338420205554 },
    { 'x': 35.02379816010375, 'y': 48.474146890278206 },
    { 'x': 35.02369903742556, 'y': 48.473871058444644 },
    { 'x': 35.02753297102697, 'y': 48.47321821467304 },
    { 'x': 35.030367527391036, 'y': 48.47253256258912 },
    { 'x': 35.03164086960703, 'y': 48.47199290385882 },
    { 'x': 35.03197206885113, 'y': 48.47227222618537 }
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
    const newGeoObjects: GeoObjectEdit[] = [tractor4, airplane2, tractor3, tractor, building, building2, tractor2, airplane, helicopter2, buildings3, crane, steelRoad, train, buildings4];
    // for (let i = 0; i < newGeoObjects.length; i++) {
    //   newGeoObjects[i].coords = { x: 35.028 + Math.random() * delta, y: 48.474 + Math.random() * delta };
    // }
    this.mapObjects = newGeoObjects;
  }

  onObjectClick(geoObject: GeoObjectEdit) {
    console.log(geoObject);
  }
}
