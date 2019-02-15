import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  avatar: 'https://www.pexels.com/photo/scenic-view-of-beach-248797/', // imageData
  legalEntityName: '',
  goal: '',
  region: '',
  address: '',
  fieldOfActivity: '',
  companyAge: 0,
  employeesNumber: '',
  employeesToHire: 0,
  grossIncome: '',
  averageCheck: 10,
  mounthlyClients: 0,
  averagePrice: 50,
  description: '',
  moneyRequired: 123,
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
  readonly emptyVendorCompany: VendorCompany =  emptyVendorCompany;

  projectForUpdate: VendorCompany = null; // initial when click on selected project

  constructor(private http: HttpClient) { }

  fetchVendorCompanies(): Observable<VendorCompany[]> {
    // return this.http.get<VendorCompany[]>(`${environment.api_projects_url}api/Projects`);
    // .pipe(
    //   // map(response => response['data'])
    //   // tap(
    //   //   data => console.log(data)
    //   // )
    // );
    return of([result, result]).pipe(
      delay(1000)
    );
  }

  createVendorCompany(newVendorCompany: VendorCompany): Observable<any> {
    return this.http.post<any>(`${environment.api_projects_url}api/Projects`, newVendorCompany);
  }

  updateVendorCompany(projectId: number, updatedVendorCompany: VendorCompany): Observable<any> {
    return this.http.put<any>(`${environment.api_projects_url}/api/Projects/${projectId}`, updatedVendorCompany);
  }
}
