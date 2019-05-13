import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VendorProject } from 'src/app/models/vendorProject';
import { environment } from 'src/environments/environment';
import { tap, map, catchError, delay } from 'rxjs/operators';
import { FilteredProjects } from 'src/app/models';
import { responseProjects } from 'src/app/services/helperServices/projects';

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

  searchByFilter(filter: any = {}): Observable<FilteredProjects> {
    // return this.http.post<FilteredProjects>(environment.projects + environment.filteringProjects, filter)
    return of(JSON.parse(JSON.stringify(responseProjects)))
      .pipe(
        delay(1500), // todo remove
        // map((response) => {
        //   for (let i = 0; i < response.data.projectsList.length; i++) {
        //     response.data.projectsList[i].id = Math.random();
        //   }
        // }),


        map((response: any) => {
          if (response['data'] == null) {
            return emptyFilteredProjects;
          }
          return response['data'];
        })
      );
  }

  fetchVendorProjects(): Observable<VendorProject[]> {
    return this.http.get<VendorProject[]>(environment.projects + environment.vendorProject)
      .pipe(
        tap(res => {
          console.log(res);
        }),
        map(response => {
          return response['data'];
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
    // return this.http.post<FilteredProjects>(environment.projects + environment.filteringProjects, {
    //   keyWord_TODO_NAME: keyword,
    //   pageSize,
    //   page
    // })
    return of(JSON.parse(JSON.stringify(responseProjects)))
      .pipe(
        delay(1500), // todo remove
        // map((response) => {
        //   for (let i = 0; i < response.data.projectsList.length; i++) {
        //     response.data.projectsList[i].id = Math.random();
        //   }
        // }),


        map(response => {
          if (response['data'] == null) {
            return emptyFilteredProjects;
          }
          return response['data'];
        })
      );
  }
}
