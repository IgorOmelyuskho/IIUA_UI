import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewProjectsService } from 'src/app/services/viewProjects/view-projects.service';
import { ViewVendorProject } from 'src/app/models/viewVendorProject';
import { Router } from '@angular/router';
import { FilteredProjects } from 'src/app/models';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-view-vendor-projects',
  templateUrl: './view-vendor-projects.component.html',
  styleUrls: ['./view-vendor-projects.component.scss']
})
export class ViewVendorProjectsComponent implements OnInit, AfterViewInit {

  projects: ViewVendorProject[] = [];
  noUiSlider: any;
  showProgress = false;
  searchCompanyName: string;
  searchProjectName: string;

  pageSize = 2;
  pagesCount = 0;
  projectsCount = 0;
  pageNumber = 1;
  filter: any = {
    page: this.pageNumber,
    pageSize: this.pageSize
  };
  prevSearch: string; // filter / name

  budgetFrom: string;
  budgetTo: string;
  budgetElement: any;
  budgetFromElement: any;
  budgetToElement: any;

  region: string;

  moneyFrom: string;
  moneyTo: string;
  moneyElement: any;
  moneyFromElement: any;
  moneyToElement: any;

  constructor(private viewProjectsService: ViewProjectsService, private router: Router) { }

  ngOnInit() {
    // filter.budget = this.budgetFrom;
    // filter.region = this.region;
    // filter.companyAge = 0;
    // filter.moneyRequired = this.moneyFrom;
    this.searchByFilter(this.filter);
  }

  ngAfterViewInit() {
    this.noUiSlider = window['noUiSlider'];
    this.initBudgetSlider();
    this.initMoneySlider();
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

  initMoneySlider() {
    this.moneyElement = document.getElementById('money-range');
    this.moneyFromElement = document.getElementById('money-from');
    this.moneyToElement = document.getElementById('money-to');

    this.noUiSlider.create(this.moneyElement, {
      start: [0, 30000000],
      connect: true,
      range: {
        'min': 0,
        'max': 100000000
      }
    });

    this.moneyElement.noUiSlider.on('update', (values, handle) => {
      const value = values[handle];
      if (handle) {
        this.moneyToElement.value = Math.round(value);
      } else {
        this.moneyFromElement.value = Math.round(value);
      }
    });

    this.moneyFromElement.addEventListener('change', () => {
      this.moneyElement.noUiSlider.set([this.moneyFromElement.value, null]);
    });

    this.moneyToElement.addEventListener('change', () => {
      this.moneyElement.noUiSlider.set([null, this.moneyToElement.value]);
    });
  }

  goToProject(project: ViewVendorProject) {
    this.viewProjectsService.projectForView = project;
    this.router.navigate(['home', 'investor', 'project', project.id]);
  }

  searchByCompanyInput(e) {
    if (e.code === 'Enter') {
      this.searchByCompanyName(this.searchCompanyName, this.pageSize, this.pageNumber);
    }
  }

  searchByProjectInput(e) {
    if (e.code === 'Enter') {
      this.searchByProjectName(this.searchProjectName, this.pageSize, this.pageNumber);
    }
  }

  searchByCompanyNameBtn() {
    this.searchByCompanyName(this.searchCompanyName, this.pageSize, this.pageNumber);
  }

  searchByProjectNameBtn() {
    this.searchByProjectName(this.searchProjectName, this.pageSize, this.pageNumber);
  }

  searchByCompanyName(name: string, pageSize: number, pageNumber: number) {
    console.log(arguments);
    this.prevSearch = 'companyName';
    this.showProgressBar(true);
    this.viewProjectsService.searchByCompanyName(name, pageSize, pageNumber)
      .subscribe(
        (filteringProjects: FilteredProjects) => {
          console.log(filteringProjects);
          this.pagesCount = filteringProjects.pages;
          this.projectsCount = filteringProjects.projectsCount;
          this.projects = filteringProjects.projectsList;
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
          console.log(filteringProjects);
          this.pagesCount = filteringProjects.pages;
          this.projectsCount = filteringProjects.projectsCount;
          this.projects = filteringProjects.projectsList;
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
    this.searchByFilter(this.filter);
  }

  searchByFilter(filter: any) {
    this.prevSearch = 'filter';
    this.showProgressBar(true);
    this.viewProjectsService.fetchProjects(filter).subscribe(
      (filteringProjects: FilteredProjects) => {
        console.log(filteringProjects);
        this.pagesCount = filteringProjects.pages;
        this.projectsCount = filteringProjects.projectsCount;
        this.projects = filteringProjects.projectsList;
        this.showProgressBar(false);
      },
      err => {
        console.warn(err);
        this.showProgressBar(false);
      }
    );
  }

  pageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex + 1;

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

}
