import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { VendorProject } from 'src/app/models/vendorProject';
import { responseProject, responseProject2 } from 'src/app/helperClasses/projects';

const emptyVendorProject: VendorProject = {
  name: '',
  avatar: '',
  legalEntityName: '',
  goal: '',
  region: '',
  address: '',
  fieldOfActivity: '',
  companyAge: 0,
  employeesNumber: '',
  employeesToHire: 0,
  grossIncome: '',
  averageCheck: 0,
  mounthlyClients: 0,
  averagePrice: 0,
  description: '',
  moneyRequired: 0,
  investmentDescription: '',
  steps: [],
  videos: [],
  images: [],
  files: [],
  rating: ''
};

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  readonly emptyVendorProject: VendorProject = emptyVendorProject;

  projectForUpdate: VendorProject = null; // initial when click on selected project

  constructor(private http: HttpClient) { }

  fetchVendorProjects(): Observable<VendorProject[]> {
    // return this.http.get<VendorProject[]>(environment.projects + environment.vendorProject)
    //   .pipe(
    //     map((response: any) => {
    //       return response['data'];
    //     }),

    //     // replace avatara to avatar
    //     map((projects: VendorProject[]) => {
    //       for (let i = 0; i < projects.length; i++) {
    //         projects[i].avatar = projects[i].avatara;
    //         delete projects[i].avatara;
    //       }
    //       return projects;
    //     }),
    //   );
    return of([responseProject, responseProject2, responseProject, responseProject2, responseProject, responseProject2]).pipe(
      // map((projects: VendorProject[]) => {
      //   for (let i = 0; i < projects.length; i++) {
      //     projects[i].avatar = projects[i].avatara;
      //     delete projects[i].avatara;
      //   }
      //   return projects;
      // }),
    );
  }

  createVendorProject(newVendorProject: VendorProject): Observable<any> {
    return this.http.post<any>(environment.projects + environment.vendorProject, newVendorProject);
  }

  updateVendorProject(projectId: string, updatedVendorProject: VendorProject): Observable<any> {
    return this.http.put<any>(environment.projects + environment.vendorProject + projectId, updatedVendorProject);
  }
}
