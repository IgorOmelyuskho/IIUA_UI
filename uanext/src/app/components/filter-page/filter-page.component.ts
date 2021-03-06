import {
  Component, OnInit, AfterViewInit,
  ViewChild, ElementRef, Input, OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import FormHelper from '../../helperClasses/helperClass';
import { fromEvent, BehaviorSubject, Observable, Subscription, concat } from 'rxjs';
import { tap, map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { VendorProject } from 'src/app/models/vendorProject';
import { FilterFields, FilteredProjects, GeoObject } from 'src/app/models';
import { FilteredProjectsService } from 'src/app/services/http/filtered-projects.service';

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss']
})
export class FilterPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchByKeyWordInput') searchByKeyWordInput: ElementRef;
  @ViewChild('rightCol') rightCol: ElementRef;

  FormHelper = FormHelper;
  self = 'FilterPageComponent';

  projects: VendorProject[] = [];
  selectedProject: VendorProject;
  showProgress = false;
  searchWord: string;

  pageSize = 5;
  pagesCount = 0;
  projectsCount = 0;
  pageNumber = 1;

  selectedMenuItem: string;
  prevSearch: string; // filter/keyWord
  filterItemForRemove: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  filter: FilterFields = {};
  $searchByFilterChange: BehaviorSubject<FilterFields> = new BehaviorSubject(this.filter);
  $fromEvent: Subscription;
  searchByScroll = false; // by scroll or by (filter/name)
  mapObjects = [];

  constructor(
    private router: Router,
    private filteredProjectsService: FilteredProjectsService
  ) { }

  ngOnInit() {
    this.galleryOptions = [
      {
        preview: true,
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        thumbnailsMoveSize: 4
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }

  ngAfterViewInit() {
    this.$fromEvent = fromEvent<any>(this.searchByKeyWordInput.nativeElement, 'input')
      .pipe(
        map(e => e.target.value),
        debounceTime(1000),
        filter(e => e.length >= 3),
        distinctUntilChanged((a, b) => a === b),
        tap(res => {
          this.searchByScroll = false;
        })
      )
      .subscribe(res => {
        this.resetBeforeNewSearch();
        this.searchProjectsByKeyword(this.searchWord, this.pageSize, this.pageNumber);
      });

    this.$searchByFilterChange
      .pipe(
        debounceTime(1000),
        tap(res => {
          this.searchByScroll = false;
        })
      )
      .subscribe(filterParam => {
        this.resetBeforeNewSearch();
        this.searchProjectsByFilter(filterParam); // async
      });
  }

  onFilterItemRemove(filterItemForRemoveParam) {
    this.filterItemForRemove = filterItemForRemoveParam;
  }

  filterOnChange(filterParam: FilterFields) {
    if (filterParam != null) {
      this.filter = filterParam;
    }
    this.filter.page = 1;
    this.filter.pageSize = this.pageSize;
    this.$searchByFilterChange.next(this.filter);
  }

  setGalleryImages(images) {
    const imagesArr = [];
    for (let i = 0; i < images.length; i++) {
      const item = { small: images[i].url, medium: images[i].url, big: images[i].url };
      imagesArr.push(item);
    }

    this.galleryImages = imagesArr;
  }

  goToProject(project: VendorProject) {
    let vendorOrInvestor: string;
    this.filteredProjectsService.projectForView = project;
    if (this.router.url.includes('investor')) {
      vendorOrInvestor = 'investor';
    }
    if (this.router.url.includes('vendor')) {
      vendorOrInvestor = 'vendor';
    }
    this.router.navigate(['home', vendorOrInvestor, 'viewProjects', 'project', project.id]);
  }

  selectProject(project: VendorProject) {
    this.selectedProject = { ...project };
    this.selectedMenuItem = 'shared';
    this.setGalleryImages(this.selectedProject.images);
    this.setMapCoordinateByProject(project);
  }

  setMapCoordinateByProject(project: VendorProject) {
    project['projectCoords'] = {
      x: 35.028 + Math.random() * 0.1,
      y: 48.4747 + Math.random() * 0.1,
    };

    // mapSetProject(project); // todo
  }

  searchByKeywordBtn(event) {
    this.searchByScroll = false;
    this.resetBeforeNewSearch();
    this.searchProjectsByKeyword(this.searchWord, this.pageSize, this.pageNumber);
  }

  searchByKeywordInput(event) {
    if (event.target.value === '') {
      this.filterOnChange(null);
    }
  }

  // http
  searchProjectsByKeyword(keyword: string, pageSize: number, pageNumber: number) {
    this.prevSearch = 'keyWord';
    this.showProgress = true;
    this.filteredProjectsService.searchByKeyword(keyword, pageSize, pageNumber)
      .subscribe(
        (filteringProjects: FilteredProjects) => {
          this.pagesCount = filteringProjects.pages;
          this.projectsCount = filteringProjects.projectsCount;
          this.addNewProjects(filteringProjects.projectsList);
          this.showProgress = false;
        },
        err => {
          console.warn(err);
          this.showProgress = false;
        }
      );
  }

  // http
  searchProjectsByFilter(filterParam: any) {
    this.prevSearch = 'filter';
    this.showProgress = true;
    this.filteredProjectsService.searchByFilter(filterParam)
      .subscribe(
        (filteringProjects: FilteredProjects) => {
          this.pagesCount = filteringProjects.pages;
          this.projectsCount = filteringProjects.projectsCount;
          this.addNewProjects(filteringProjects.projectsList);
          this.showProgress = false;
        },
        err => {
          console.warn(err);
          this.showProgress = false;
        }
      );
  }

  addNewProjects(newProjects: VendorProject[]) {
    if (this.searchByScroll === false) {
      this.projects = [];
    }

    for (let i = 0; i < newProjects.length; i++) {
      this.projects.push(newProjects[i]);
    }
  }

  resetBeforeNewSearch() {
    this.projects = [];
    this.pageNumber = 1;
    this.filter.page = 1;
    this.filter.pageSize = this.pageSize;
  }

  onScroll() {
    this.pageNumber += 1;
    this.searchByScroll = true;

    if (this.prevSearch === 'filter') {
      this.filter.page = this.pageNumber;
      this.filter.pageSize = this.pageSize;
      this.searchProjectsByFilter(this.filter);
    }
    if (this.prevSearch === 'keyWord') {
      this.searchProjectsByKeyword(this.searchWord, this.pageSize, this.pageNumber);
    }
  }

  onScrollUp() {
    // this.pageNumber -= 1;
  }

  onMapObjectClick(mapProject: GeoObject) {
    // todo
  }

  scrollToElement(id) {
    const el = document.getElementById('2');
    // el.scrollIntoView({ behavior: 'smooth', inline: 'start' });
    el.scrollIntoView();
    el.classList.remove('animation-class');
    setTimeout(() => {
      el.classList.add('animation-class');
    }, 0);
  }

  previewOpenHandler() {
    this.rightCol.nativeElement.style.zIndex = '1000000';
  }

  previewCloseHandler() {
    this.rightCol.nativeElement.style.zIndex = '1';
  }

  ngOnDestroy() {
    this.$fromEvent.unsubscribe();
    this.$searchByFilterChange.unsubscribe();
  }

}

