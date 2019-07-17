import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap, delay } from 'rxjs/operators';
import { VendorProject } from 'src/app/models/vendorProject';
import { responseProject, responseProject2 } from 'src/app/helperClasses/projects';

const emptyVendorProject: VendorProject = {
  name: '',
  avatara: '',
  legalEntityName: '',
  goal: '',
  region: '',
  address: '',
  activities: [{ id: 1, name: 'string' }],
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
    return this.http.get<VendorProject[]>(environment.projects + environment.vendorProject)
      .pipe( // todo comment all pipe
        map((response: VendorProject[]) => {
          for (let i = 0; i < response.length; i++) {
            response[i].avatara = {
              id: Math.random(),
              url: 'http://minio.iiua.com.ua/iiua.files.public/571369312.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-' +
              'Credential=root%2F20190717%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20190717T195002Z&X-Amz-Expires=1000&X' +
              '-Amz-SignedHeaders=host&&X-Amz-Signature=2ed8ecad7a03620a73914b33b8e663b160216823549be6bdeb3f1b92a8d5e4a5',
              originalName: 'originalName'
            };
          }
          return response;
        })
      );

    // todo comment
    // return of([responseProject, responseProject2, responseProject, responseProject2, responseProject, responseProject2])
    //   .pipe(
    //     map(val => {
    //       const res = JSON.parse(JSON.stringify(val));
    //       for (let i = 0; i < res.length; i++) {
    //         res[i].id = 'ID' + Math.random();
    //       }
    //       return res;
    //     }),
    //     delay(1000)
    //   );
  }

  createVendorProject(newVendorProject: VendorProject): Observable<any> {
    return this.http.post<any>(environment.projects + environment.vendorProject, newVendorProject);
  }

  updateVendorProject(projectId: string, updatedVendorProject: VendorProject): Observable<any> {
    return this.http.put<any>(environment.projects + environment.vendorProject + projectId, updatedVendorProject);
  }
}
