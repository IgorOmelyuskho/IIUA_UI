import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VendorProject } from 'src/app/models/vendorProject';
import { environment } from 'src/environments/environment';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { FilteredProjects, FilterFields } from 'src/app/models';
import { responseProjects } from 'src/app/helperClasses/projects';
import { FilterComponent } from 'src/app/components';

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

  constructor(private http: HttpClient) { }

  searchByFilter(filter: FilterFields = {}): Observable<FilteredProjects> {
    if (filter.companyName == null) { // todo remove
      filter.companyName = '';
    }
    if (filter.projectName == null) { // todo remove
      filter.projectName = '';
    }

    if (filter.moneyRequiredFrom == null || filter.moneyRequiredTo == null) {
      filter.moneyRequiredFrom = '0';
      filter.moneyRequiredTo = '100000000000000';
    }
    // replace fieldOfActivity to activities
    if (filter.fieldOfActivity) {
      filter.activities = filter.fieldOfActivity;
    }

    // return of(JSON.parse(JSON.stringify(responseProjects)));
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
          for (let i = 0; i < response.projectsList.length; i++) {
            response.projectsList[i].avatara = {
              id: Math.random(),
              url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrW2Jc5MRcTd3SO3-Pjq_O7CJICQRkTbLYkBiaNy2iuOv4jDUM',
              originalName: 'originalName'
            };
            response.projectsList[i].activities = [{
              id: 1,
              class: '1.1',
              name: 'TestName1'
            }];
          }
          return response;
        })
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
    return of(JSON.parse(JSON.stringify(responseProjects)));
    // return this.http.post<FilteredProjects>(environment.projects + environment.filteringProjects, {
    //   projectName: keyword,
    //   companyName: keyword,
    //   pageSize,
    //   page
    // })
    //   .pipe(
    //     map(response => {
    //       if (response['data'] == null) {
    //         return emptyFilteredProjects;
    //       }
    //       return response['data'];
    //     })
    //   );
  }
}
