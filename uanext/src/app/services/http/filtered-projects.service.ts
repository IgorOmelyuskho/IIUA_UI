import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VendorProject } from 'src/app/models/vendorProject';
import { environment } from 'src/environments/environment';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { FilteredProjects, FilterFields, GeoObject } from 'src/app/models';
import { responseProjects } from 'src/app/helperClasses/projects';
import { FilterComponent } from 'src/app/components';
import { FieldActivityInterface, TranslateService } from '../translate.service';
import { StateService } from '../state/state.service';

const emptyFilteredProjects = {
  pages: 0,
  projectsCount: 0,
  projectsList: []
};

@Injectable({
  providedIn: 'root'
})
export class FilteredProjectsService {

  projectForView: VendorProject = null; // initial when click on selected project
  fieldActivityOptions: FieldActivityInterface[];

  constructor(private http: HttpClient, private translateService: TranslateService, private stateService: StateService) {
    this.translateService.fieldOfActivityOptions.subscribe(
      (val: FieldActivityInterface[]) => {
        this.fieldActivityOptions = JSON.parse(JSON.stringify(val));
      }
    );
  }

  searchByFilter(filter: FilterFields = {}): Observable<FilteredProjects> {
    // return of(JSON.parse(JSON.stringify(responseProjects)));
    filter = this.fixFilterForBackend(filter);
    return this.http.post<FilteredProjects>(environment.projects + environment.filteringProjects, filter)
      .pipe(
        map((response: FilteredProjects) => {
          if (response == null) {
            return emptyFilteredProjects;
          }
          return response;
        }),
        map((response: FilteredProjects) => { // todo remove
          this.addAvatara(response);
          return this.addRating(response);
          // return this.add3DObjectsArr(response);
        }),
      );
  }

  searchByKeyword(keyword: string, pageSize: number, page: number): Observable<FilteredProjects> {
    // return of(JSON.parse(JSON.stringify(responseProjects)));
    let filter: any = {
      projectName: keyword,
      companyName: keyword,
      pageSize,
      page
    };

    filter = this.fixFilterForBackend(filter);
    return this.http.post<FilteredProjects>(environment.projects + environment.filteringProjects, filter)
      .pipe(
        map(response => {
          if (response == null) {
            return emptyFilteredProjects;
          }
          return response;
        }),
        map((response: FilteredProjects) => { // todo remove
          this.addAvatara(response);
          return this.addRating(response);
          // return this.add3DObjectsArr(response);
        }),
      );
  }

  private fixFilterForBackend(filter: FilterFields | any): FilterFields {
    // if (filter.companyName == null) {
    //   filter.companyName = '';
    // }
    // if (filter.projectName == null) {
    //   filter.projectName = '';
    // }

    if (filter.moneyRequiredFrom == null || filter.moneyRequiredTo == null) {
      filter.moneyRequiredFrom = '0';
      filter.moneyRequiredTo = '100000000';
    }

    if ((filter.sphereActivities == null || filter.sphereActivities.length === 0) && this.fieldActivityOptions != null) {
      filter.sphereActivities = this.fieldActivityOptions
        .filter(opt => opt.name !== this.fieldActivityOptions[0].name)
        .map(opt => {
          return {
            id: opt.id,
            name: opt.name
          };
        });
    }
    return filter;
  }

  private addAvatara(filteredProjects: FilteredProjects): FilteredProjects {
    for (let i = 0; i < filteredProjects.projectsList.length; i++) {
      if (filteredProjects.projectsList[i].avatara == null) {
        filteredProjects.projectsList[i].avatara = {
          id: 1,
          url: window.location.origin + '/assets/img/Network-Profile.png',
          originalName: 'Network-Profile.png'
        };
      }
    }
    return filteredProjects;
  }

  private addRating(filteredProjects: FilteredProjects): FilteredProjects {
    for (let i = 0; i < filteredProjects.projectsList.length; i++) {
      filteredProjects.projectsList[i].rating = '9.5';
    }
    return filteredProjects;
  }

  private add3DObjectsArr(filteredProjects: FilteredProjects): FilteredProjects {
    const delta = 0.005;
    const x = 35.024159076690694;
    const y = 48.46812449736811;
    for (let i = 0; i < filteredProjects.projectsList.length; i++) {
      filteredProjects.projectsList[i].geoObjects = [
        /*         {
                  geoObjectId: 'ID-' + Math.random(),
                  coords: { x: x + Math.random() * delta, y: y + Math.random() * delta },
                  projectName: filteredProjects.projectsList[i].name,
                  pathToZip: window.location.origin + '/assets/objects/tractor.zip',
                  pathToZipLP: window.location.origin + '/assets/objects/low-poly-tractor.zip',
                  project: filteredProjects.projectsList[i],
                  canMove: true
                },
                {
                  geoObjectId: 'ID-' + Math.random(),
                  coords: { x: x + Math.random() * delta, y: y + Math.random() * delta },
                  projectName: filteredProjects.projectsList[i].name,
                  pathToZip: window.location.origin + '/assets/objects/tractor.zip',
                  pathToZipLP: window.location.origin + '/assets/objects/low-poly-tractor.zip',
                  project: filteredProjects.projectsList[i],
                  canMove: true
                }, */
        {
          geoObjectId: 'ID-' + Math.random(),
          coords: { x: x + Math.random() * delta, y: y + Math.random() * delta },
          projectName: filteredProjects.projectsList[i].name,
          path: window.location.origin + '/assets/objects/tractor.zip',
          // pathToZipLP: window.location.origin + '/assets/objects/low-poly-tractor.zip',
          project: filteredProjects.projectsList[i],
          canMove: true
        },
        {
          geoObjectId: 'ID-' + Math.random(),
          coords: { x: x + Math.random() * delta, y: y + Math.random() * delta },
          projectName: filteredProjects.projectsList[i].name,
          path: window.location.origin + '/assets/objects/building.zip',
          // pathToZipLP: window.location.origin + '/assets/objects/low-poly-building.zip',
          project: filteredProjects.projectsList[i],
          canMove: false
        },
      ];

    }
    return filteredProjects;
  }

  private currentUserGeoObject(geoObject: GeoObject): boolean {
    console.log(this.stateService.getId());
    console.log(this.stateService.getUserId());

    return true;
  }

}
