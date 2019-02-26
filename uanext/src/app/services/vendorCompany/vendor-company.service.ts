import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VendorCompany } from 'src/app/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

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
  steps: [],
  videos: []
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
  videos: [],
  photos: [],
  files: []
};

@Injectable({
  providedIn: 'root'
})
export class VendorCompanyService {
  readonly emptyVendorCompany: VendorCompany = emptyVendorCompany;

  projectForUpdate: VendorCompany = null; // initial when click on selected project

  constructor(private http: HttpClient) { }

  fetchVendorCompanies(): Observable<VendorCompany[]> {
    return this.http.get<VendorCompany[]>(environment.projects_api_url + environment.vendorProject)
      .pipe(
        map(response => response['data']),
        map(projects => { // replace avatara to avatar
          for (let i = 0; i < projects.length; i++) {
            projects[i].avatar = projects[i].avatara;
            delete projects[i].avatara;
          }
          return projects;
        }),
        map(projects => {
          for (let i = 0; i < projects.length; i++) {

            // avatar
            projects[i].avatar = 'https://images.pexels.com/photos/248797/' +
              'pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

            // photos
            projects[i].photos = [];
            for (let photo = 0; photo < 5; photo++) {
              const photoObj = {
                url: 'https://images.pexels.com/photos/248797/' +
                  'pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
                name: 'photo name ' + photo,
              };
              projects[i].photos.push(photoObj);
            }

            // foles
            projects[i].files = [];
            for (let file = 0; file < 5; file++) {
              const fileObj = {
                name: 'file name ' + file
              };
              projects[i].files.push(fileObj);
            }

          }
          return projects;
        }),
        tap(val => console.log(val))
      );
  }

  createVendorCompany(newVendorCompany: VendorCompany): Observable<any> {
    return this.http.post<any>(environment.projects_api_url + environment.vendorProject, newVendorCompany);
  }

  updateVendorCompany(projectId: number, updatedVendorCompany: VendorCompany): Observable<any> {
    return this.http.put<any>(environment.projects_api_url + environment.vendorProject + projectId, updatedVendorCompany);
  }



  uploadAvatar(avatar, projectId) {
    return this.http.post<any>(environment.projects_api_url + environment.uploadAvatar + projectId, avatar);
  }

  uploadPhotos(formData) {
    return this.http.post<any>(`${environment.projects_api_url}`, formData);
  }

  uploadFiles(formData) {
    return this.http.post<any>(`${environment.projects_api_url}`, formData);
  }
}
