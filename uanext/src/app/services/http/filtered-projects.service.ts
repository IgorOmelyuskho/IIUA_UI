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
export class ViewProjectsService {

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
        map((response: FilteredProjects) => {
          for (let i = 0; i < response.projectsList.length; i++) {
            response.projectsList[i].rating = '9.5';
          }
          return response;
        }),
        map((response: FilteredProjects) => { // todo remove
          return this.addAvatara(response);
        }),
      );
  }

  // searchByProjectName(name: string, pageSize: number, page: number): Observable<FilteredProjects> {
  //   return this.http.post<FilteredProjects>(environment.projects + environment.filteringProjects, {
  //     projectName: name,
  //     pageSize,
  //     page
  //   })
  //     .pipe(
  //       map(response => {
  //         if (response['data'] == null) {
  //           return emptyFilteredProjects;
  //         }
  //         return response['data'];
  //       })
  //     );
  // }

  // searchByCompanyName(name: string, pageSize: number, page: number): Observable<FilteredProjects> {
  //   return this.http.post<FilteredProjects>(environment.projects + environment.filteringProjects, {
  //     companyName: name,
  //     pageSize,
  //     page
  //   })
  //     .pipe(
  //       map(response => {
  //         if (response['data'] == null) {
  //           return emptyFilteredProjects;
  //         }
  //         return response['data'];
  //       })
  //     );
  // }

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
          if (response['data'] == null) {
            return emptyFilteredProjects;
          }
          return response['data'];
        }),
        map((response: FilteredProjects) => { // todo remove
          return this.addAvatara(response);
        }),
      );
  }

  fixFilterForBackend(filter: FilterFields | any): FilterFields {
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

    if (filter.sphereActivities == null || filter.sphereActivities.length === 0) {
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

  addAvatara(filteredProjects: FilteredProjects): FilteredProjects {
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

}
