import { Component, OnInit } from '@angular/core';
import { GeoObject } from 'src/app/models';
import { VendorProject } from 'src/app/models/vendorProject';
import { StateService } from 'src/app/services/state/state.service';
import { ProjectsService } from 'src/app/services/http/projects.service';
import { MapService } from 'src/app/services/http/map.service';
import { Object3DDto } from 'src/app/models/object3DDto';
import { ProjectGeoObjectDto } from 'src/app/models/projectGeoObjectDto';

@Component({
  selector: 'app-main-screen-vendor',
  templateUrl: './main-screen-vendor.component.html',
  styleUrls: ['./main-screen-vendor.component.scss']
})
export class MainScreenVendorComponent implements OnInit {
  self = 'MainScreenVendorComponent';
  actionIsExpanded = false;
  onlyMyProjects = false;
  upload3dModels = false;
  geoObjects: GeoObject[];
  showTooltip = false;

  constructor(private stateService: StateService, private projectsService: ProjectsService, private mapService: MapService) { }

  ngOnInit() {
    this.projectsService.fetchVendorProjects().subscribe(
      (projects: VendorProject[]) => {
        const projectGeoObjects: ProjectGeoObjectDto[] = this.getAllGeoObjectsFromProjects(projects);
        // const geoObjectsArr: GeoObject[] = [];
        // this.geoObjects = geoObjectsArr;
        console.log(this.geoObjects);
        this.mapService.get3DObject(this.geoObjects[0].geoObjectId).subscribe(
          (val: Object3DDto) => {
            console.log(val);
          }
        );
      },
      err => {
        console.warn(err);
        this.geoObjects = [];
      }
    );
  }

  getAllGeoObjectsFromProjects(projectsArr: VendorProject[]): GeoObject[] {
    const result: GeoObject[] = [];
    for (let i = 0; i < projectsArr.length; i++) {
      for (let j = 0; j < projectsArr[i].geoObjects.length; j++) {
        result.push(projectsArr[i].geoObjects[j]);
      }
    }
    return result;
  }

  onMapObjectClick(mapObject: GeoObject) {
    this.stateService.selectedVendorProject$.next(mapObject.project);
  }

  onMapObjectHover(mapObject: GeoObject) {
  }

  quickActionClick() {
    this.upload3dModels = false;
    this.actionIsExpanded = !this.actionIsExpanded;
  }

  onlyMyProjectsClick() {
    this.onlyMyProjects = !this.onlyMyProjects;
  }

  upload3dModelsClick() {
    this.actionIsExpanded = false;
    this.upload3dModels = !this.upload3dModels;

    if (this.upload3dModels === true) {
      this.showTooltip = true;
    } else {
      this.showTooltip = false;
    }
  }

  closeTooltipForm(event) {
    if (event === true) {
      this.showTooltip = false;
    }
  }
}
