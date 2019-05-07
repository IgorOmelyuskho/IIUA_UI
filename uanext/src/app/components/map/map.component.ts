import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Map } from './map4';
// import { mapInit, mapDestroy, mapSetProject } from './map4-no-class';

// declare const THREE: any;
// declare const maptalks: any;

// const zoomWhenChangeVisible = 16;
// const initZoom = 15;
// const updatedInterval = 15000;
// const drawInterval = 50;

// const polygon1 = [
//   [13.417223404477, 52.5283447684827],
//   [13.41620416505134, 52.52709807661344],
//   [13.417598913739084, 52.526699911021495],
//   [13.418757628033518, 52.527861761172375],
//   [13.42018456322944, 52.527463602503616],
//   [13.421311091015696, 52.528605851303695]
// ];
// const polygon2 = [
//   [13.41561, 52.539611],
//   [13.41861, 52.539611],
//   [13.41861, 52.542611],
//   [13.41561, 52.542611]
// ];

// const polygonArr = [polygon1, polygon2];

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map = null;


  // infoWindow = {};
  // canvasElem = null;
  // stats = null;
  // scene = null;
  // threeLayer = null;
  // raycaster = null;
  // mouse = null;
  // markerLayer = null;
  // selectedObject = null;
  // map = null;
  // objectsArr = [];
  // timer1 = null;
  // timer2 = null;
  // animationFrame = null;
  // mapElement = null;
  // mapWrapperElement = null;
  // clusterLayer = null;
  // polygonLayer = null;
  // labelRenderer = null;
  // camera = null;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.map = new Map();
    // mapInit();

    // setInterval(() => {
    //   console.log(this);
    // }, 5000);
  }

  ngOnDestroy() {
    // this.map.mapDestroy();
    // mapDestroy();
  }


}
