import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ViewProjectsService } from 'src/app/services/viewProjects/view-projects.service';
import { ViewVendorProject } from 'src/app/models/viewVendorProject';
import { Router } from '@angular/router';
import { FilteredProjects } from 'src/app/models';
import { PageEvent } from '@angular/material';
import { init, destroy, setProject } from './map2.js';

@Component({
  selector: 'app-view-vendor-projects',
  templateUrl: './view-vendor-projects.component.html',
  styleUrls: ['./view-vendor-projects.component.scss']
})
export class ViewVendorProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapWrapper') mapWrapperElement: ElementRef;
  @ViewChild('projectInfo') projectInfoWindow: ElementRef;
  onScrollBind = this.onScroll.bind(this);

  projects: ViewVendorProject[] = [];
  selectedProject: ViewVendorProject;
  noUiSlider: any;
  showProgress = false;
  searchCompanyName: string;
  searchProjectName: string;
  scrolled = 0;

  pageSize = 5;
  pagesCount = 0;
  projectsCount = 0;
  pageNumber = 1;

  filter: any = {
    page: this.pageNumber,
    pageSize: this.pageSize
  };
  prevSearch: string; // filter/projectName/companyName

  budgetElement: any;
  budgetFromElement: any;
  budgetToElement: any;

  region = 'ALL';

  ageElement: any;
  ageFromElement: any;
  ageToElement: any;

  constructor(private viewProjectsService: ViewProjectsService, private router: Router) { }

  ngOnInit() {
    document.addEventListener('scroll', this.onScrollBind);
  }

  ngAfterViewInit() {
    this.noUiSlider = window['noUiSlider'];
    this.initBudgetSlider();
    this.initAgeSlider();

    this.filter.moneyRequiredFrom = this.budgetFromElement.value;
    this.filter.moneyRequiredTo = this.budgetToElement.value;
    this.filter.region = this.region;
    this.filter.companyAgeFrom = this.ageFromElement.value;
    this.filter.companyAgeTo = this.ageToElement.value;
    setTimeout(() => { // mat-progress-bar
      this.searchByFilter(this.filter);
    }, 0);

    // if (this.projects != null) {
      init();
    // }
  }

  onScroll() {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    this.scrolled = scrolled;
    this.mapWrapperElement.nativeElement.style.marginTop = scrolled + 'px';
  }

  initBudgetSlider() {
    this.budgetElement = document.getElementById('budget-range');
    this.budgetFromElement = document.getElementById('budget-from');
    this.budgetToElement = document.getElementById('budget-to');

    this.noUiSlider.create(this.budgetElement, {
      start: [0, 30000000],
      connect: true,
      range: {
        'min': 0,
        'max': 100000000
      }
    });

    this.budgetElement.noUiSlider.on('update', (values, handle) => {
      const value = values[handle];
      if (handle) {
        this.budgetToElement.value = Math.round(value);
      } else {
        this.budgetFromElement.value = Math.round(value);
      }
    });

    this.budgetFromElement.addEventListener('change', () => {
      this.budgetElement.noUiSlider.set([this.budgetFromElement.value, null]);
    });

    this.budgetToElement.addEventListener('change', () => {
      this.budgetElement.noUiSlider.set([null, this.budgetToElement.value]);
    });
  }

  initAgeSlider() {
    this.ageElement = document.getElementById('age-range');
    this.ageFromElement = document.getElementById('age-from');
    this.ageToElement = document.getElementById('age-to');

    this.noUiSlider.create(this.ageElement, {
      start: [0, 50],
      connect: true,
      range: {
        'min': 0,
        'max': 100
      }
    });

    this.ageElement.noUiSlider.on('update', (values, handle) => {
      const value = values[handle];
      if (handle) {
        this.ageToElement.value = Math.round(value);
      } else {
        this.ageFromElement.value = Math.round(value);
      }
    });

    this.ageFromElement.addEventListener('change', () => {
      this.ageElement.noUiSlider.set([this.ageFromElement.value, null]);
    });

    this.ageToElement.addEventListener('change', () => {
      this.ageElement.noUiSlider.set([null, this.ageToElement.value]);
    });
  }

  goToProject(project: ViewVendorProject) {
    this.viewProjectsService.projectForView = project;
    this.router.navigate(['home', 'investor', 'project', project.id]);
  }

  showProjectInfo(project: ViewVendorProject) {
    this.selectedProject = project;
    const coords = this.mapWrapperElement.nativeElement.getBoundingClientRect();
    this.projectInfoWindow.nativeElement.style.display = 'block';
    this.projectInfoWindow.nativeElement.style.top = coords.top + this.projectInfoWindow.nativeElement.style.right + 'px';
    this.projectInfoWindow.nativeElement.style.width = coords.width + 10 + 'px';
  }

  hideProjectInfo() {
    this.projectInfoWindow.nativeElement.style.display = '';
  }

  searchByCompanyInput(e) {
    if (e.code === 'Enter') {
      this.changeSearchType();
      this.searchByCompanyName(this.searchCompanyName, this.pageSize, this.pageNumber);
    }
  }

  searchByProjectInput(e) {
    if (e.code === 'Enter') {
      this.changeSearchType();
      this.searchByProjectName(this.searchProjectName, this.pageSize, this.pageNumber);
    }
  }

  searchByCompanyNameBtn() {
    this.changeSearchType();
    this.searchByCompanyName(this.searchCompanyName, this.pageSize, this.pageNumber);
  }

  searchByProjectNameBtn() {
    this.changeSearchType();
    this.searchByProjectName(this.searchProjectName, this.pageSize, this.pageNumber);
  }

  searchByCompanyName(name: string, pageSize: number, pageNumber: number) {
    this.prevSearch = 'companyName';
    this.showProgressBar(true);
    this.viewProjectsService.searchByCompanyName(name, pageSize, pageNumber)
      .subscribe(
        (filteringProjects: FilteredProjects) => {
          this.pagesCount = filteringProjects.pages;
          this.projectsCount = filteringProjects.projectsCount;
          // this.projects = filteringProjects.projectsList; // use for pagination
          this.addNewProjects(filteringProjects.projectsList);
          this.showProgressBar(false);
        },
        err => {
          console.warn(err);
          this.showProgressBar(false);
        }
      );
  }

  searchByProjectName(name: string, pageSize: number, pageNumber: number) {
    this.prevSearch = 'projectName';
    this.showProgressBar(true);
    this.viewProjectsService.searchByProjectName(name, pageSize, pageNumber)
      .subscribe(
        (filteringProjects: FilteredProjects) => {
          this.pagesCount = filteringProjects.pages;
          this.projectsCount = filteringProjects.projectsCount;
          // this.projects = filteringProjects.projectsList; // use for pagination
          this.addNewProjects(filteringProjects.projectsList);
          this.showProgressBar(false);
        },
        err => {
          console.warn(err);
          this.showProgressBar(false);
        }
      );
  }

  showProgressBar(show: boolean) {
    if (show === true) {
      this.showProgress = true;
    } else {
      this.showProgress = false;
    }
  }

  searchByFilterBtn() {
    this.filter.moneyRequiredFrom = this.budgetFromElement.value;
    this.filter.moneyRequiredTo = this.budgetToElement.value;
    this.filter.region = this.region;
    this.filter.companyAgeFrom = this.ageFromElement.value;
    this.filter.companyAgeTo = this.ageToElement.value;
    this.changeSearchType();
    this.searchByFilter(this.filter);
  }

  searchByFilter(filter: any) {
    if (filter.region != null && filter.region === 'ALL') {
      filter.region = '';
    }
    this.prevSearch = 'filter';
    this.showProgressBar(true);
    this.viewProjectsService.fetchProjects(filter).subscribe(
      (filteringProjects: FilteredProjects) => {
        console.log(filteringProjects);
        this.pagesCount = filteringProjects.pages;
        this.projectsCount = filteringProjects.projectsCount;
        // this.projects = filteringProjects.projectsList; // use for pagination
        this.addNewProjects(filteringProjects.projectsList);
        this.showProgressBar(false);
      },
      err => {
        console.warn(err);
        this.showProgressBar(false);
      }
    );
  }

  addNewProjects(newProjects: any[]) {
    for (let i = 0; i < newProjects.length; i++) {
      this.projects.push(newProjects[i]);
    }
  }

  changeSearchType() {
    this.projects = [];
    this.pageNumber = 1;
    this.filter.page = 1;
  }

  pageEvent(e: PageEvent) {
    // this.pageSize = e.pageSize;
    // this.pageNumber = e.pageIndex + 1;

    // if (this.prevSearch === 'filter') {
    //   this.filter.page = this.pageNumber;
    //   this.filter.pageSize = this.pageSize;
    //   this.searchByFilter(this.filter);
    // }
    // if (this.prevSearch === 'companyName') {
    //   this.searchByCompanyName(this.searchCompanyName, this.pageSize, this.pageNumber);
    // }
    // if (this.prevSearch === 'projectName') {
    //   this.searchByProjectName(this.searchProjectName, this.pageSize, this.pageNumber);
    // }
  }

  onScroll2() {
    console.log('scrolled!!');
    this.pageNumber += 1;

    if (this.prevSearch === 'filter') {
      this.filter.page = this.pageNumber;
      this.filter.pageSize = this.pageSize;
      this.searchByFilter(this.filter);
    }
    if (this.prevSearch === 'companyName') {
      this.searchByCompanyName(this.searchCompanyName, this.pageSize, this.pageNumber);
    }
    if (this.prevSearch === 'projectName') {
      this.searchByProjectName(this.searchProjectName, this.pageSize, this.pageNumber);
    }
  }

  onScrollUp() {
    console.log('scroll UP');
    // this.pageNumber -= 1;
  }

  projectMouseEnter(project: ViewVendorProject) { // or request for data ?
    const rightProject: any = {};
    rightProject.id = project.id;
    rightProject.projectCoords = {
      x: 13.41561 + Math.random() * 0.1,
      y: 52.539611 + Math.random() * 0.1,
    };

    setProject(rightProject);
  }

  ngOnDestroy() {
    destroy();
    document.removeEventListener('scroll', this.onScrollBind);
  }

}
