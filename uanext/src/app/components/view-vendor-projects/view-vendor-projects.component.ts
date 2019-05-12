import {
  Component, OnInit, AfterViewInit,
  ViewChild, ElementRef, Input } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { Router } from '@angular/router';
import { FilteredProjects, FilterFields } from 'src/app/models';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import FormHelper from '../../services/helperServices/formHelper';
import { ViewProjectsService } from 'src/app/services/viewProjects/view-projects.service.js';
import { fromEvent } from 'rxjs';
import { tap, map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { responseProjects } from 'src/app/services/helperServices/projects';

@Component({
  selector: 'app-view-vendor-projects',
  templateUrl: './view-vendor-projects.component.html',
  styleUrls: ['./view-vendor-projects.component.scss']
})
export class ViewVendorProjectsComponent implements OnInit, AfterViewInit {
  @ViewChild('searchByKeyWordInput') searchByKeyWordInput: ElementRef;

  FormHelper = FormHelper;

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

  filter: FilterFields;

  constructor(
    private router: Router,
    private viewProjectsService: ViewProjectsService
  ) { }

  ngOnInit() {
    this.galleryOptions = [
      {
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
    setTimeout(() => { // mat-progress-bar
      this.searchProjectsByFilter(this.filter);
    }, 0);

    setTimeout(() => { // todo remove (use when click to mapObject)
      // this.scrollToElement(4);
      const el = document.getElementById('4');
      console.log(el.scrollTop);
      console.log(el.scrollHeight);
      console.log(el.scrollHeight - el.clientHeight);
    }, 1500);

    setTimeout(() => { // todo remove
      this.scrollToElement(1);
    }, 20000);

    fromEvent<any>(this.searchByKeyWordInput.nativeElement, 'input')
      .pipe(
        map(e => e.target.value),
        debounceTime(700),
        filter(e => e.length >= 3),
        distinctUntilChanged((a, b) => a === b),
      )
      .subscribe(res => {
        this.resetBeforeNewSearch();
        this.searchProjectsByKeyword(this.searchWord, this.pageSize, this.pageNumber);
      });
  }

  onFilterItemRemove(filterItemForRemoveParam) {
    this.filterItemForRemove = filterItemForRemoveParam;
  }

  filterOnChange(filterParam: FilterFields) {
    this.filter = filterParam;
    console.log(this.filter);
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
    this.viewProjectsService.projectForView = project;
    this.router.navigate(['home', 'investor', 'project', project.id]);
  }

  selectProject(project: VendorProject) {
    this.selectedProject = {...project};
    this.selectedMenuItem = 'shared';
    this.setGalleryImages(this.selectedProject.images);
    this.setMapCoordinateByProject(project);
  }

  setMapCoordinateByProject(project: VendorProject) {
    project['projectCoords'] = {
      x: 13.41561 + Math.random() * 0.1,
      y: 52.539611 + Math.random() * 0.1,
    };

    // mapSetProject(project); // todo
  }

  searchByKeywordBtn(event) {
    this.resetBeforeNewSearch();
    this.searchProjectsByKeyword(this.searchWord, this.pageSize, this.pageNumber);
  }

  searchByKeywordKeyDown(e) {
    if (e.code === 'Enter') {
      this.resetBeforeNewSearch();
      this.searchProjectsByKeyword(this.searchWord, this.pageSize, this.pageNumber);
    }
  }

  searchProjectsByKeyword(keyword: string, pageSize: number, pageNumber: number) {
    console.log('searchProjectsByKeyword = ', keyword);
    this.prevSearch = 'keyWord';
    this.showProgressBar(true);
    // this.viewProjectsService.searchByKeyword(keyword, pageSize, pageNumber)
    //   .subscribe(
    //     (filteringProjects: FilteredProjects) => {
    //       this.pagesCount = filteringProjects.pages;
    //       this.projectsCount = filteringProjects.projectsCount;
    //       this.addNewProjects(filteringProjects.projectsList);
    //       this.showProgressBar(false);
    //     },
    //     err => {
    //       console.warn(err);
    //       this.showProgressBar(false);
    //     }
    //   );
    this.addNewProjects(responseProjects.data.projectsList);
    this.showProgressBar(false);
  }

  searchByFilter() {
    this.resetBeforeNewSearch();
    this.searchByKeywordBtn(this.filter); // todo this.filter
  }

  searchProjectsByFilter(filterParam: any) {
    this.prevSearch = 'filter';
    this.showProgressBar(true);
    // this.viewProjectsService.searchByFilter(filter).subscribe(
    //   (filteringProjects: FilteredProjects) => {
    //     console.log(filteringProjects);
    //     this.pagesCount = filteringProjects.pages;
    //     this.projectsCount = filteringProjects.projectsCount;
    //     this.addNewProjects(filteringProjects.projectsList);
    //     this.showProgressBar(false);
    //   },
    //   err => {
    //     console.warn(err);
    //     this.showProgressBar(false);
    //   }
    // );
    this.addNewProjects(responseProjects.data.projectsList);
    this.showProgressBar(false);
  }

  showProgressBar(show: boolean) {
    if (show === true) {
      this.showProgress = true;
    } else {
      this.showProgress = false;
    }
  }

  addNewProjects(newProjects: any[]) {
    for (let i = 0; i < newProjects.length; i++) {
      this.projects.push(newProjects[i]);
    }
  }

  resetBeforeNewSearch() {
    this.projects = [];
    this.pageNumber = 1;
    this.filter.page = 1;
  }

  onScroll() {
    console.log('scrolled!!');
    this.pageNumber += 1;

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
    console.log('scroll UP');
    // this.pageNumber -= 1;
  }

  onMapObjectClick(mapProject: any) {
    console.log(mapProject);
  }

  onMapFinishInit() {
    console.log('load obj model after this log');
  }

  scrollToElement(id) {
    // const el = document.getElementById(id);
    // el.scrollIntoView({behavior: 'smooth', inline: 'start'});
  }

}
