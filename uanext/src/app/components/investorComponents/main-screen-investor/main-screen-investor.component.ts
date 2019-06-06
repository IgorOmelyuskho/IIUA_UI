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
  @ViewChild('interactiveInvestmentCard') interactiveInvestmentCard: ElementRef;

  selectedProject: VendorProject = null;
  selectedProjectId: string = null;

  filter: FilterFields;
  filterIsExpanded = false; // false - свернут

  showPreviewCard = false;
  previewCardX = 0;
  previewCardY = 0;
  hoveredProjectUploaded = false;
  hoveredProject: VendorProject;

  windowMouseMoveHandler = (e) => {
    this.previewCardX = e.pageX;
    this.previewCardY = e.pageY;
  }

  windowClickHandler = (e) => {
    this.showPreviewCard = false;
  }

  constructor(private stateService: StateService, private renderer: Renderer2) { }

  ngOnInit() {
    new Image().src = '../../../assets/img/message-3.png';
    new Image().src = '../../../assets/img/bell-hover.png';
    new Image().src = '../../../assets/img/approve-hover.png';
  }

  ngAfterViewInit() {
    window.addEventListener('mousemove', this.windowMouseMoveHandler);
    window.addEventListener('mousedown', this.windowClickHandler);

    this.stateService.interactiveInvestmentProject$
      .subscribe(
        (project: VendorProject) => {
          if (project == null) {
            this.interactiveInvestmentCard.nativeElement.style.display = 'none';
          } else {
            this.interactiveInvestmentCard.nativeElement.style.display = 'block';
          }
        }
      );
  }

  filterOnChange(filterParam: FilterFields) {
    this.filter = filterParam;
  }

  onMapObjectClick(mapObject: GeoObject) {
    this.selectedProject = { ...mapObject.project };
    this.selectedProjectId = mapObject.project.id;
  }

  onMapObjectHover(mapObject: GeoObject) {
    const cardWidth = 578;
    const cardHeight = 178;
    const deltaY = 30;

    const rightMenu = document.getElementById('investor-main-screen-right-menu');
    const rightMenuOffset = rightMenu.offsetWidth + parseInt(window.getComputedStyle(rightMenu).right, 10);

    const rightComponent = document.getElementById('investor-main-screen-right-component');
    let rightComponentOffset = 0;
    if (rightComponent != null) {
      rightComponentOffset = rightComponent.offsetWidth + parseInt(window.getComputedStyle(rightComponent).right, 10);
    }

    let resultX = this.previewCardX;
    let resultY = this.previewCardY + deltaY;

    if ( this.previewCardX > window.innerWidth - cardWidth - rightMenuOffset) {
      resultX = window.innerWidth - cardWidth - rightMenuOffset - 5;
    }
    if (rightComponentOffset !== 0 && this.previewCardX > window.innerWidth - cardWidth - rightComponentOffset) {
      resultX = window.innerWidth - cardWidth - rightComponentOffset - 5;
    }
    if (this.previewCardY + deltaY > window.innerHeight - cardHeight) {
      resultY = this.previewCardY - deltaY - cardHeight;
    }
    this.previewCardWrapper.nativeElement.style.left = resultX + 'px';
    this.previewCardWrapper.nativeElement.style.top = resultY + 'px';
    this.hoveredProject = mapObject.project;
    this.showPreviewCard = true;
  }

  onMapFinishInit() {
    // todo 'load obj model after this log'
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
