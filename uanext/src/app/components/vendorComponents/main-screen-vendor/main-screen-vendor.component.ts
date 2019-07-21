import { Component, OnInit } from '@angular/core';
import { GeoObject } from 'src/app/models';
import { VendorProject } from 'src/app/models/vendorProject';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-main-screen-vendor',
  templateUrl: './main-screen-vendor.component.html',
  styleUrls: ['./main-screen-vendor.component.scss']
})
export class MainScreenVendorComponent implements OnInit {
  self = 'MainScreenVendorComponent';
  actionIsExpanded = false;

  constructor(private stateService: StateService) { }

  ngOnInit() {
  }

  onMapObjectClick(mapObject: GeoObject) {
    this.stateService.selectedVendorProject$.next(mapObject.project);
  }

  onMapObjectHover(mapObject: GeoObject) {
  }

  onMapFinishInit() {
    // todo 'load obj model after this log'
  }

}
