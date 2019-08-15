import { Component, OnInit } from '@angular/core';
import { GeoObject } from 'src/app/models';
import { VendorProject } from 'src/app/models/vendorProject';
import { StateService } from 'src/app/services/state/state.service';
import { ProjectsService } from 'src/app/services/http/projects.service';

@Component({
  selector: 'app-main-screen-vendor',
  templateUrl: './main-screen-vendor.component.html',
  styleUrls: ['./main-screen-vendor.component.scss']
})
export class MainScreenVendorComponent implements OnInit {
  self = 'MainScreenVendorComponent';
  actionIsExpanded = false;
  onlyMyProjects = false;
  geoObjects: GeoObject[];

  constructor(private stateService: StateService, private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectsService.fetchVendorProjects().subscribe(
      (projects: VendorProject[]) => {
        const geoObjectsArr: GeoObject[] = [];
        for (let i = 0; i < projects.length; i++) {
          for (let j = 0; j < projects[i].TEST_3D_Objects_Arr.length; j++) {
            geoObjectsArr.push(projects[i].TEST_3D_Objects_Arr[j]);
          }
        }
        this.geoObjects = geoObjectsArr;
      },
      err => {
        console.warn(err);
        this.geoObjects = [];
      }
    );
  }

  onMapObjectClick(mapObject: GeoObject) {
    this.stateService.selectedVendorProject$.next(mapObject.project);
  }

  onMapObjectHover(mapObject: GeoObject) {
  }

  onlyMyProjectsClick() {
    this.onlyMyProjects = !this.onlyMyProjects;
  }
}
