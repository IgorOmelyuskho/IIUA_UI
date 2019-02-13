import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VendorCompany } from 'src/app/models';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, delay } from 'rxjs/operators';

const result = { // todo remove
  id: 'id_123',
  name: 'string',
  avatar: 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', // imageData
  legalEntityName: 'string',
  goal: 'string',
  region: 'string',
  address: 'string',
  fieldOfActivity: 'string',
  companyAge: 10,
  employeesNumber: '6-10',
  employeesToHire: 5,
  grossIncome: '100',
  averageCheck: 'string',
  mounthlyClients: 50,
  averagePrice: 'string',
  description: 'string',
  moneyRequired: 'string',
  investmentDescription: 'string',
  steps: [{ id: 1111, data: 'step1' }, { id: 2222, data: 'step2' }, { id: 3333, data: 'step3' }],

  // photos: '1111', // imageData
  // videos: '22222', // unknow
  // files: '33333', // fileData
};

const emptyVendorCompany: VendorCompany = {
  id: '',
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
  averageCheck: '',
  mounthlyClients: 0,
  averagePrice: '',
  description: '',
  moneyRequired: '',
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

  constructor(private http: HttpClient) { }

  fetchVendorCompany(companyId: number): Observable<VendorCompany> {
    // return this.http.get<VendorCompany>(`${environment.api_2_url}api/Vendor/company${companyId}`).pipe(
    //   map(response => response['data'])
    // );
    return of(result).pipe(
      delay(3000)
    );
  }

  createVendorCompany(newVendorCompany: VendorCompany): Observable<any> {
    return this.http.post<any>(`${environment.api_2_url}api/Vendor/createCompany`, newVendorCompany);
  }

  updateVendorCompany(vendorId: string, updatedVendorCompany: VendorCompany): Observable<any> {
    return this.http.post<any>(`${environment.api_2_url}api/Vendor/updateCompany/${vendorId}`, updatedVendorCompany);
  }
}
