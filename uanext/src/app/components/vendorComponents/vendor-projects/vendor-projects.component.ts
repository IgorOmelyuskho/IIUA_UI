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
    const layout = this.projects.map((project) => {
      return {
        projectId: project.id,
        queuePosition: project.queuePosition
      };
    });
    if (layout) {
      this.loadLayout(grid, layout);
    } else {
      grid.layout(true);
    }
    grid.layout(true);
  }

  saveLayout(grid) {
    const itemIdsArr = grid.getItems().map((item) => {
      return item.getElement().getAttribute('data-id');
    });
    const res = [];
    for (let i = 0; i < itemIdsArr.length; i++) {
      res.push({
        projectId: parseInt(itemIdsArr[i], 10),
        queuePosition: i,
      });
    }
    console.log(res);
    this.projectsService.setProjectsQueue(res).subscribe();
  }

  loadLayout(grid, layout) {
    console.log(layout);
    const sortedByQueuePosition = layout.sort((a, b) => {
      if (a.queuePosition < b.queuePosition) {
        return -1;
      }
      if (a.queuePosition > b.queuePosition) {
        return 1;
      }
      return 0;
    });

    const layoutIdArr = sortedByQueuePosition.map(opt => {
      return opt.projectId;
    });

    const currentItems = grid.getItems();
    const currentItemIds = currentItems.map((item) => {
      return item.getElement().getAttribute('data-id');
    });
    this.checkMatchLengths(currentItems, currentItemIds, layoutIdArr, grid);
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
    } catch (err) {
      console.log(err);
    }
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
