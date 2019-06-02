import { Component, OnInit } from '@angular/core';
import { GeoObject } from 'src/app/models';
import { VendorProject } from 'src/app/models/vendorProject';

@Component({
  selector: 'app-main-screen-vendor',
  templateUrl: './main-screen-vendor.component.html',
  styleUrls: ['./main-screen-vendor.component.scss']
})
export class MainScreenVendorComponent implements OnInit {

  selectedProject: VendorProject = null;
  selectedProjectId: string  = null;

  actionIsExpanded = false;

  constructor() { }

  ngOnInit() {
  }

  onMapObjectClick(mapObject: GeoObject) {
    this.selectedProject = { ...mapObject.project };
    this.selectedProjectId = mapObject.project.id;
  }

  onMapObjectHover(mapObject: GeoObject) {
  }

  onMapFinishInit() {
    console.log('load obj model after this log');
  }

}
