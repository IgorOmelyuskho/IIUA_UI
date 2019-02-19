import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { VendorCompany } from 'src/app/models';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, delay, tap } from 'rxjs/operators';

const result: VendorCompany = { // todo remove
  id: 3,
  name: 'name1',
  avatar: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', // imageData
  legalEntityName: 'legalEntityName',
  goal: 'goal',
  region: 'region',
  address: 'address',
  fieldOfActivity: 'fieldOfActivity',
  companyAge: 10,
  employeesNumber: '101',
  employeesToHire: 5,
  grossIncome: '100',
  averageCheck: 1000,
  mounthlyClients: 50,
  averagePrice: 123,
  description: 'string',
  moneyRequired: 10000,
  investmentDescription: 'string',
  steps: [{ id: 1111, data: 'step1' }, { id: 2222, data: 'step2' }, { id: 3333, data: 'step3' }],

  // photos: '1111', // imageData
  // videos: '22222', // unknow
  // files: '33333', // fileData
};

const emptyVendorCompany: VendorCompany = {
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

  // photos: []', // imageData
  // videos: [], // unknow
  // files: [], // fileData
};

@Injectable({
  providedIn: 'root'
})
export class VendorCompanyService {
  readonly emptyVendorCompany: VendorCompany = emptyVendorCompany;

  projectForUpdate: VendorCompany = null; // initial when click on selected project

  constructor(private http: HttpClient) { }

  fetchVendorCompanies(): Observable<VendorCompany[]> {
    return this.http.get<VendorCompany[]>(`${environment.api_projects_url}api/Projects`)
      .pipe(
        map(response => response['data']),

        map((projects: VendorCompany[]) => {
          for (let i = 0; i < projects.length; i++) {
            projects[i].avatar = 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
          }
          return projects;
        }),

        tap(
          data => console.log(data)
        ),
      );

    // return of([result, result]).pipe(
    //   delay(1000)
    // );
  }

  createVendorCompany(newVendorCompany: VendorCompany): Observable<any> {
    return this.http.post<any>(`${environment.api_projects_url}api/Projects`, newVendorCompany);
  }

  updateVendorCompany(projectId: number, updatedVendorCompany: VendorCompany): Observable<any> {
    return this.http.put<any>(`${environment.api_projects_url}api/Projects/${projectId}`, updatedVendorCompany);
  }




  fetchPhotos(): Observable<any> {
    return this.http.get<any>(`${environment.api_projects_url}api/Projects/fetchphotos`);
  }

  fetchFiles(): Observable<any> {
    return this.http.get<any>(`${environment.api_projects_url}api/Projects/fetcfiles`);
  }

  fetchVideos(): Observable<any> {
    return this.http.get<any>(`${environment.api_projects_url}api/Projects/fetcvideos`);
  }




  uploadPhotos(formData) {
    return this.http.post<any>(`${environment.api_projects_url}api/Projects/photos`, formData);
  }

  uploadVideos(formData) {
    return this.http.post<any>(`${environment.api_projects_url}api/Projects/videos`, formData);
  }

  uploadFiles(formData) {
    return this.http.post<any>(`${environment.api_projects_url}api/Projects/files`, formData);
  }
}
