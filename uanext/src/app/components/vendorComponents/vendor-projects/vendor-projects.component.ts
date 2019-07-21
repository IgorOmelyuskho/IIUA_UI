import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { VendorProject } from 'src/app/models/vendorProject';
import { ProjectsService } from 'src/app/services/http/projects.service';
import Muuri from 'muuri';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-vendor-projects',
  templateUrl: './vendor-projects.component.html',
  styleUrls: ['./vendor-projects.component.scss']
})
export class VendorProjectsComponent implements OnInit {
  projects: VendorProject[] = [];
  isLoaded = false;
  self = 'VendorProjectsComponent';
  selfUserId: string;

  constructor(private router: Router, private projectsService: ProjectsService, private stateService: StateService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.projectsService.fetchVendorProjects().subscribe(
      (projects: VendorProject[]) => {
        this.projects = projects;
        this.isLoaded = true;
        requestAnimationFrame(() => {
          this.initMuuri();
        });
      },
      err => {
        console.warn(err);
        this.projects = [];
        this.isLoaded = true;
      }
    );
  }

  initMuuri() {
    const grid = new Muuri('#projects-1-for-muuri', {
      dragEnabled: true,
      layoutOnInit: false,
      dragStartPredicate: {
        distance: 10,
      },
    }).on('dragEnd', (item, event) => {
      this.saveLayout(grid);
      this.stateService.cardClickEnabled = false;
    });

    const layout = window.localStorage.getItem('layout-1');
    if (layout) {
      this.loadLayout(grid, layout);
    } else {
      grid.layout(true);
    }
    grid.layout(true);
  }

  serializeLayout(grid) {
    const itemIds = grid.getItems().map((item) => {
      return item.getElement().getAttribute('data-id');
    });
    return JSON.stringify(itemIds);
  }

  saveLayout(grid) {
    const layout = this.serializeLayout(grid);
    window.localStorage.setItem('layout-1', layout);
  }

  loadLayout(grid, serializedLayout) {
    const layout = JSON.parse(serializedLayout);
    const currentItems = grid.getItems();
    const currentItemIds = currentItems.map((item) => {
      return item.getElement().getAttribute('data-id');
    });
    this.checkMatchLengths(currentItems, currentItemIds, layout, grid);
  }

  checkMatchLengths(currentItems, currentItemIds, layout, grid) {
    const arrayDifference = (x1, x2) => {
      return x1.filter(x => !x2.includes(x));
    };

    const arrDiff = arrayDifference(currentItemIds, layout);
    arrDiff.sort((a, b) => {
      return parseInt(b, 10) - parseInt(a, 10);
    });
    const bufferArr = arrDiff.concat(layout);
    const newItems = [];
    for (let i = 0; i < bufferArr.length; i++) {
      const itemIndex = currentItemIds.indexOf(bufferArr[i]);
      newItems.push(currentItems[itemIndex]);
    }

    try {
      grid.sort(newItems, {
        layout: 'instant'
      });
    } catch { }
  }

  createNewProject() {
    this.router.navigate(['home', 'vendor', 'newProject']);
  }

  goToProject(project: VendorProject) {
    this.projectsService.projectForUpdate = project;
    this.router.navigate(['home', 'vendor', 'project', project.id]);
  }

  onCardClick(project: VendorProject) {
    this.goToProject(project);
  }

}
