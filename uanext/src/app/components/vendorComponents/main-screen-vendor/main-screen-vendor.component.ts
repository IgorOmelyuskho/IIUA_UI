import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { GeoObject, FilterFields, FilteredProjects } from 'src/app/models';
import { VendorProject } from 'src/app/models/vendorProject';
import { StateService } from 'src/app/services/state/state.service';
import { ProjectsService } from 'src/app/services/http/projects.service';
import { MapService } from 'src/app/services/http/map.service';
import { Object3DDto } from 'src/app/models/object3DDto';
import { ProjectGeoObjectDto } from 'src/app/models/projectGeoObjectDto';
import { FilteredProjectsService } from 'src/app/services/http/filtered-projects.service';

@Component({
  selector: 'app-main-screen-vendor',
  templateUrl: './main-screen-vendor.component.html',
  styleUrls: ['./main-screen-vendor.component.scss']
})
export class MainScreenVendorComponent implements OnInit, AfterViewInit, OnDestroy {
  self = 'MainScreenVendorComponent';
  actionIsExpanded = false;
  onlyMyProjects = false;
  upload3dModels = false;
  chooseProject = false;
  geoObjects: GeoObject[];
  showTooltip = false;
  @ViewChild('previewCardWrapper') previewCardWrapper: ElementRef;
  showPreviewCard = false;
  previewCardX = 0;
  previewCardY = 0;
  hoveredProject: VendorProject;
  projects: VendorProject[] = [];
  @ViewChild('animatedBtn') animatedBtn: ElementRef;

  windowMouseMoveHandler = (e) => {
    this.previewCardX = e.pageX;
    this.previewCardY = e.pageY;
  }

  windowClickHandler = (e) => {
    setTimeout(() => {
      this.showPreviewCard = false;
    }, 100);
  }

  constructor(private stateService: StateService, private projectsService: ProjectsService, private mapService: MapService, private filteredProjectsService: FilteredProjectsService) { }

  ngOnInit() {
    this.projectsService.fetchVendorProjects().subscribe(
      (val: VendorProject[]) => {
        this.projects = val.sort((a: VendorProject, b: VendorProject) => {
          if (a.queuePosition < b.queuePosition) {
            return -1;
          }
          if (a.queuePosition > b.queuePosition) {
            return 1;
          }
          return 0;
        });
      }
    );
  }

  ngAfterViewInit() {
    window.addEventListener('mousemove', this.windowMouseMoveHandler);
    window.addEventListener('mousedown', this.windowClickHandler);
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
    console.log(mapObject);
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
      if (this.stateService.selectedVendorProject$.value == null) {
        this.animatedBtn.nativeElement.classList.add('animated-btn');
      }
    } else {
      this.showTooltip = false;
    }
  }

  chooseProjectClick() {
    this.chooseProject = !this.chooseProject;
    if (this.chooseProject === true) {
      this.animatedBtn.nativeElement.classList.remove('animated-btn');
    }
  }

  changeProject(project: VendorProject) {
    this.stateService.selectedVendorProject$.next(project);
    this.chooseProject = false;
  }

  closeTooltipForm(event) {
    if (event === true) {
      this.showTooltip = false;
    }
  }

  onMapChangeExtent(extent) {
    const filter: FilterFields = {};
    filter.coordinateFrame = extent;
    filter.pageSize = 1000;
    filter.page = 1;

    this.mapService.mapFilteringProjects(filter).subscribe(
      (val: Object3DDto) => {
        console.log(val);
      }
    );

    // this.filteredProjectsService.searchByFilter().subscribe( // remove
    //   (val: FilteredProjects) => {
    //     const projectGeoObjects: GeoObject[] = this.getAllGeoObjectsFromProjects(val.projectsList);
    //     const result: GeoObject[] = projectGeoObjects.filter((geoObject, index) => { // get first x
    //       if (index < 50) {
    //         return geoObject;
    //       }
    //     });

    //     for (let i = 0; i < result.length; i++) {
    //       result[i].coords = {
    //         x: Math.random() * 50,
    //         y: Math.random() * 50
    //       };
    //       result[i].rotate = Math.random() * 3;
    //       result[i].scale = 1 + Math.random() * 5;
    //       result[i].projectName = 'RANDOM PROJECT NAME';
    //     }
    //     this.geoObjects = result;
    //     console.log(this.geoObjects);
    //   }
    // );
  }

  onMapObjectHover(mapObject: GeoObject) {
    console.log('TODO SHOW PROJECT CARD');
    // const cardWidth = 578;
    // const cardHeight = 178;
    // const deltaY = 30;

    // const rightMenu = document.getElementById('investor-main-screen-right-menu');
    // const rightMenuOffset = rightMenu.offsetWidth + parseInt(window.getComputedStyle(rightMenu).right, 10);

    // const rightComponent = document.getElementById('investor-main-screen-right-component');
    // let rightComponentOffset = 0;
    // if (rightComponent != null) {
    //   rightComponentOffset = rightComponent.offsetWidth + parseInt(window.getComputedStyle(rightComponent).right, 10);
    // }

    // let resultX = this.previewCardX;
    // let resultY = this.previewCardY + deltaY;

    // if (this.previewCardX > window.innerWidth - cardWidth - rightMenuOffset) {
    //   resultX = window.innerWidth - cardWidth - rightMenuOffset - 5;
    // }
    // if (rightComponentOffset !== 0 && this.previewCardX > window.innerWidth - cardWidth - rightComponentOffset) {
    //   resultX = window.innerWidth - cardWidth - rightComponentOffset - 5;
    // }
    // if (this.previewCardY + deltaY > window.innerHeight - cardHeight) {
    //   resultY = this.previewCardY - deltaY - cardHeight;
    // }
    // this.previewCardWrapper.nativeElement.style.left = resultX + 'px';
    // this.previewCardWrapper.nativeElement.style.top = resultY + 'px';
    // this.hoveredProject = mapObject.project;
    // this.showPreviewCard = true;
  }

  ngOnDestroy() {
    window.removeEventListener('mousemove', this.windowMouseMoveHandler);
    window.removeEventListener('mousedown', this.windowClickHandler);
  }

}
