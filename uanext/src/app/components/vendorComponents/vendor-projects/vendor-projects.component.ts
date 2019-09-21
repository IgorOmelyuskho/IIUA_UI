import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  prevLayout: any[];
  grid: any;
  layout: any;

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
    this.grid = new Muuri('#projects-1-for-muuri', {
      dragEnabled: true,
      layoutOnInit: false,
      dragStartPredicate: {
        distance: 10,
      },
    }).on('dragEnd', (item, event) => {
      const projectId: string = item.getElement().getAttribute('data-id');
      this.saveLayout(this.grid, projectId, true);
      this.stateService.cardClickEnabled = false;
    });
    this.layout = this.projects.map((project) => {
      return {
        projectId: project.id,
        queuePosition: project.queuePosition
      };
    });
    if (this.layout) {
      this.loadLayout(this.grid, this.layout);
    } else {
      this.grid.layout(true);
    }
    this.grid.layout(true);
    this.saveLayout(this.grid, null, false);
  }

  saveLayout(grid: any, projectId: string, sendToBackend: boolean) {
    const itemIdsArr = grid.getItems().map((item) => {
      return item.getElement().getAttribute('data-id');
    });
    const newLayout = [];
    for (let i = 0; i < itemIdsArr.length; i++) {
      newLayout.push({
        projectId: parseInt(itemIdsArr[i], 10),
        queuePosition: i,
      });
    }
    if (sendToBackend === true) {
      const forSend: any = {};
      forSend.projectId = parseInt(projectId, 10);
      forSend.oldQueuePosition = this.prevLayout.map(opt => opt.projectId).indexOf(parseInt(projectId, 10));
      forSend.newQueuePosition = newLayout.map(opt => opt.projectId).indexOf(parseInt(projectId, 10));
      this.projectsService.setProjectsQueue(forSend).subscribe();
      this.prevLayout = newLayout;
    } else {
      this.prevLayout = newLayout;
    }
  }

  loadLayout(grid, layout) {
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
      return parseInt(item.getElement().getAttribute('data-id'), 10);
    });
    this.applyLayout(currentItems, currentItemIds, layoutIdArr, grid);
  }

  applyLayout(currentItems, currentItemIds, layout, grid) {
    const newItems = [];
    for (let i = 0; i < layout.length; i++) {
      const itemIndex = currentItemIds.indexOf(layout[i]);
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

  removeCard(project: VendorProject) {
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].id === project.id) {
        this.projects.splice(i, 1);
        return;
      }
    }
  }

}
