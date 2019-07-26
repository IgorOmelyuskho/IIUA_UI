import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
// import { mapInit, mapDestroy, mapSetProject } from './map3-no-class';
// import { Map } from './map3';
import { VendorProject } from 'src/app/models/vendorProject.js';
import { FilterFields, UserRole, GeoObject, FilteredProjects } from 'src/app/models/index.js';
import { StateService } from 'src/app/services/state/state.service';
import { responseProject } from 'src/app/helperClasses/projects';
import { BehaviorSubject, Subscription, fromEvent } from 'rxjs';
import { map, debounceTime, filter, distinctUntilChanged, tap } from 'rxjs/operators';
import { ViewProjectsService } from 'src/app/services/http/filtered-projects.service';

@Component({
  selector: 'app-main-screen-investor',
  templateUrl: './main-screen-investor.component.html',
  styleUrls: ['./main-screen-investor.component.scss']
})
export class MainScreenInvestorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('previewCardWrapper') previewCardWrapper: ElementRef;
  @ViewChild('interactiveInvestmentCard') interactiveInvestmentCard: ElementRef;
  @ViewChild('searchByKeyWordInput') searchByKeyWordInput: ElementRef;
  self = 'MainScreenInvestorComponent';

  selectedProject: VendorProject = null;
  selectedProjectId: string = null;

  filter: FilterFields = {};
  searchWord: string;
  $searchByFilterChange: BehaviorSubject<FilterFields> = new BehaviorSubject(this.filter);
  $fromEvent: Subscription;

  filterIsExpanded = false; // false - свернут
  showPreviewCard = false;
  previewCardX = 0;
  previewCardY = 0;
  hoveredProjectUploaded = false;
  hoveredProject: VendorProject;
  projects: GeoObject[];

  showProgress: boolean;

  windowMouseMoveHandler = (e) => {
    this.previewCardX = e.pageX;
    this.previewCardY = e.pageY;
  }

  windowClickHandler = (e) => {
    setTimeout(() => {
      this.showPreviewCard = false;
    }, 100);
  }

  constructor(private stateService: StateService, private viewProjectsService: ViewProjectsService) { }

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

    this.$fromEvent = fromEvent<any>(this.searchByKeyWordInput.nativeElement, 'input')
      .pipe(
        map(e => e.target.value),
        debounceTime(1000),
        filter(e => e.length >= 3),
        distinctUntilChanged((a, b) => a === b),
      )
      .subscribe(res => {
        this.searchProjectsByKeyword(this.searchWord, 5, 1);
      });

    this.$searchByFilterChange
      .pipe(
        debounceTime(1000),
      )
      .subscribe((filterParam: FilterFields) => {
        filterParam.page = 1;
        filterParam.pageSize = 5;
        console.log(filterParam);
        this.searchProjectsByFilter(filterParam); // async
      });
  }

  filterOnChange(filterParam: FilterFields) {
    this.filter = filterParam;
    this.$searchByFilterChange.next(this.filter);
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

    if (this.previewCardX > window.innerWidth - cardWidth - rightMenuOffset) {
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

  onMapChangeExtent(extent) {
    console.log(extent);
  }

  getAvataraUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

  onCardClick(project: VendorProject) {
    this.selectedProject = { ...project };
    this.selectedProjectId = project.id;
  }

  searchByKeywordBtn(event) {
    this.searchProjectsByKeyword(this.searchWord, 5, 1);
  }

  searchByKeywordKeyDown(e) {
    if (e.code === 'Enter') {
      this.searchProjectsByKeyword(this.searchWord, 5, 1);
    }
  }

  // http
  searchProjectsByKeyword(keyword: string, pageSize: number, pageNumber: number) {
    this.showProgress = true;
      this.viewProjectsService.searchByKeyword(keyword, pageSize, pageNumber)
      .subscribe(
        (filteringProjects: FilteredProjects) => {
          const projectsArr: GeoObject[] = [];
          for (let i = 0; i < filteringProjects.projectsList.length; i++) {
            for (let j = 0; j < filteringProjects.projectsList[i].TEST_3D_Objects_Arr.length; j++) {
              projectsArr.push(filteringProjects.projectsList[i].TEST_3D_Objects_Arr[j]);
            }
          }
          this.projects = projectsArr;
          this.showProgress = false;
        },
        err => {
          console.warn(err);
          this.projects = [];
          this.showProgress = false;
        }
      );
  }

  // http
  searchProjectsByFilter(filterParam: any) {
    this.showProgress = true;
      this.viewProjectsService.searchByFilter(filterParam)
      .subscribe(
        (filteringProjects: FilteredProjects) => {
          const projectsArr: GeoObject[] = [];
          for (let i = 0; i < filteringProjects.projectsList.length; i++) {
            for (let j = 0; j < filteringProjects.projectsList[i].TEST_3D_Objects_Arr.length; j++) {
              projectsArr.push(filteringProjects.projectsList[i].TEST_3D_Objects_Arr[j]);
            }
          }
          this.projects = projectsArr;
          this.showProgress = false;
        },
        err => {
          console.warn(err);
          this.projects = [];
          this.showProgress = false;
        }
      );
  }

  ngOnDestroy() {
    window.removeEventListener('mousemove', this.windowMouseMoveHandler);
    window.removeEventListener('mousedown', this.windowClickHandler);
    this.$fromEvent.unsubscribe();
    this.$searchByFilterChange.unsubscribe();
  }
}
