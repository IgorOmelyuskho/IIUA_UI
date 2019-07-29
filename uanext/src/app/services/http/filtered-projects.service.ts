import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VendorProject } from 'src/app/models/vendorProject';
import { environment } from 'src/environments/environment';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { FilteredProjects, FilterFields } from 'src/app/models';
import { responseProjects } from 'src/app/helperClasses/projects';
import { FilterComponent } from 'src/app/components';
import { FieldActivityInterface, TranslateService } from '../translate.service';

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

  constructor(private http: HttpClient, private translateService: TranslateService) {
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
          this.addRating(response);
          this.addAvatara(response);
          return this.add3DObjectsArr(response);
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
          this.addRating(response);
          this.addAvatara(response);
          return this.add3DObjectsArr(response);
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

    if ( (filter.sphereActivities == null || filter.sphereActivities.length === 0) && this.fieldActivityOptions != null) {
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
          url: 'https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png',
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
    const delta = 0.05;
    for (let i = 0; i < filteredProjects.projectsList.length; i++) {
      if (Math.random() > 0.5) {
        filteredProjects.projectsList[i].TEST_3D_Objects_Arr = [
          {
            geoObjectId: 'ID-' + Math.random(),
            coords: { x: 13.417522340477 + Math.random() * delta, y: 52.5281444184827 + Math.random() * delta },
            projectName: filteredProjects.projectsList[i].name,
            pathToZip: window.location.origin + '/assets/objects/female.zip',
            project: filteredProjects.projectsList[i],
            canMove: true
          },
          {
            geoObjectId: 'ID-' + Math.random(),
            coords: { x: 13.417522340477 + Math.random() * delta, y: 52.5281444184827 + Math.random() * delta },
            projectName: filteredProjects.projectsList[i].name,
            pathToZip: window.location.origin + '/assets/objects/male.zip',
            project: filteredProjects.projectsList[i],
            canMove: true
          },
          {
            geoObjectId: 'ID-' + Math.random(),
            coords: { x: 13.417522340477 + Math.random() * delta, y: 52.5281444184827 + Math.random() * delta },
            projectName: filteredProjects.projectsList[i].name,
            pathToZip: window.location.origin + '/assets/objects/tractor.zip',
            project: filteredProjects.projectsList[i],
            canMove: true
          },
          {
            geoObjectId: 'ID-' + Math.random(),
            coords: { x: 13.417522340477 + Math.random() * delta, y: 52.5281444184827 + Math.random() * delta },
            projectName: filteredProjects.projectsList[i].name,
            pathToZip: window.location.origin + '/assets/objects/walt.zip',
            project: filteredProjects.projectsList[i],
            canMove: false
          },
        ];
      } else {
        filteredProjects.projectsList[i].TEST_3D_Objects_Arr = [
          {
            geoObjectId: 'ID-' + Math.random(),
            coords: { x: 13.417522340477 + Math.random() * delta, y: 52.5281444184827 + Math.random() * delta },
            projectName: filteredProjects.projectsList[i].name,
            pathToZip: window.location.origin + '/assets/objects/female.zip',
            project: filteredProjects.projectsList[i],
            canMove: true
          },
          {
            geoObjectId: 'ID-' + Math.random(),
            coords: { x: 13.417522340477 + Math.random() * delta, y: 52.5281444184827 + Math.random() * delta },
            projectName: filteredProjects.projectsList[i].name,
            pathToZip: window.location.origin + '/assets/objects/walt.zip',
            project: filteredProjects.projectsList[i],
            canMove: false
          },
        ];
      }

    }
    return filteredProjects;
  }

}
