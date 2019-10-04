import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { VendorProject } from '../models/vendorProject';
import { ProjectsService } from './http/projects.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsCacheService {
  private cache: { [key: number]: ReplaySubject<VendorProject> } = {};

  constructor(private projectsService: ProjectsService) { }

  getProject(projectId: number): Observable<VendorProject> {
    let result: Observable<VendorProject>;
    if (this.cache[projectId]) {
      result =  this.cache[projectId];
    } else {
      result =  this.addProjectToCache(projectId);
    }

    return result.pipe(
      map((project: VendorProject) => {
        return { ...project };
      })
    );
  }

  private addProjectToCache(projectId: number): Observable<VendorProject> {
    this.cache[projectId] = new ReplaySubject(1);
    this.projectsService.getProjectById(projectId).subscribe(
      (project: VendorProject) => {
        this.cache[projectId].next(project);
      },
      err => {
        console.warn(err);
      }
    );
    return this.cache[projectId];
  }
}
