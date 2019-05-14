import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
// import { mapInit, mapDestroy, mapSetProject } from './map3-no-class';
// import { Map } from './map3';
import { VendorProject } from 'src/app/models/vendorProject.js';
import { FilterFields, UserRole, GeoObject } from 'src/app/models/index.js';
import { StateService } from 'src/app/services/state/state.service';
import { responseProject } from 'src/app/helperClasses/projects';

@Component({
  selector: 'app-main-screen-investor',
  templateUrl: './main-screen-investor.component.html',
  styleUrls: ['./main-screen-investor.component.scss']
})
export class MainScreenInvestorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('previewCardWrapper') previewCardWrapper: ElementRef;

  selectedProject: VendorProject = responseProject;
  selectedProjectId: string  = responseProject.id;

  filter: FilterFields;
  filterIsExpanded = false; // false - свернут

  UserRole = UserRole;
  role: UserRole;

  showPreviewCard = false;
  previewCardX = 0;
  previewCardY = 0;
  hoveredProjectUploaded = false;
  hoveredProject: VendorProject;

  @ViewChild('stepsElement') stepsElement: ElementRef;

  windowMouseMoveHandler = (e) => {
    this.previewCardX = e.pageX;
    this.previewCardY = e.pageY;
  }

  windowClickHandler = (e) => {
    console.log('CLICK');
    this.showPreviewCard = false;
  }

  constructor(private stateService: StateService, private renderer: Renderer2) { }

  ngOnInit() {
    new Image().src = '../../../assets/img/message-hover.png';
    new Image().src = '../../../assets/img/bell-hover.png';
    new Image().src = '../../../assets/img/approve-hover.png';

    this.role = this.stateService.role();
  }

  ngAfterViewInit() {
    window.addEventListener('mousemove', this.windowMouseMoveHandler);
    window.addEventListener('mousedown', this.windowClickHandler);
  }

  filterOnChange(filterParam: FilterFields) {
    this.filter = filterParam;
    console.log(this.filter);
  }

  onMapObjectClick(mapObject: GeoObject) {
    this.selectedProject = { ...mapObject.project };
    this.selectedProjectId = mapObject.project.id;
  }

  onMapObjectHover(mapObject: GeoObject) {
    this.hoveredProject = mapObject.project;
    this.showPreviewCard = true;
    this.previewCardWrapper.nativeElement.style.left = this.previewCardX + 'px';
    this.previewCardWrapper.nativeElement.style.top = this.previewCardY + 30 + 'px';
  }

  onMapFinishInit() {
    console.log('load obj model after this log');
  }

  ngOnDestroy() {
    window.removeEventListener('mousemove', this.windowMouseMoveHandler);
    window.removeEventListener('mousedown', this.windowClickHandler);
  }

  getAvatarUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }
}
