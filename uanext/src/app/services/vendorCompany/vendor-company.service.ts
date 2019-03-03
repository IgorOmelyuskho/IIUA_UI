import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VendorCompany } from 'src/app/models';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

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
  images: [],
  files: []
};

const fakeFile = {
  'id': 23,
  'url': '/files/2ecf89d7-5fa0-7bc1-662b-5c58fb5e393f.txt',
  'name': '2ecf89d7-5fa0-7bc1-662b-5c58fb5e393f.txt',
  'accessFile': 1
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
        map((response: any) => {
          return response['data'];
        }),

        // todo replace avatara to avatar
        map((projects: VendorCompany[]) => {
          for (let i = 0; i < projects.length; i++) {
            projects[i].avatar = projects[i].avatara;
            delete projects[i].avatara;
          }
          return projects;
        }),

        // fakeFiles
        // map((projects: VendorCompany[]) => {
        //   for (let i = 0; i < projects.length; i++) {
        //     projects[i].files = [];
        //     for (let file = 0; file < 5; file++) {
        //       projects[i].files.push(fakeFile);
        //     }

        //   }
        //   return projects;
        // }),

        // replace relative link to absolute link
        map((projects: VendorCompany[]) => {
          console.log(projects);
          for (let i = 0; i < projects.length; i++) {
            // avatar
            projects[i].avatar.url = environment.projects_api_url.slice(0, -1) + projects[i].avatar.url;

            // images
            for (let img = 0; img < projects[i].images.length; img++) {
              projects[i].images[img].url = environment.projects_api_url.slice(0, -1) + projects[i].images[img].url;
            }

            // files
            for (let f = 0; f < projects[i].files.length; f++) {
              projects[i].files[f].url = environment.projects_api_url.slice(0, -1) + projects[i].files[f].url;
            }
          }

          return projects;
        }),

        tap(projects => console.log(projects))
      );
  }

  createVendorCompany(newVendorCompany: VendorCompany): Observable<any> {
    return this.http.post<any>(environment.projects_api_url + environment.vendorProject, newVendorCompany);
  }

  updateVendorCompany(projectId: number, updatedVendorCompany: VendorCompany): Observable<any> {
    return this.http.put<any>(environment.projects_api_url + environment.vendorProject + projectId, updatedVendorCompany);
  }



  uploadImages(formData: FormData): Observable<any> {
    return this.http.post<any>(environment.projects_api_url + environment.uploadImages, formData)
      .pipe(
        map(response => {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].url = environment.projects_api_url.slice(0, -1) + response.data[i].url;
          }
          return response.data;
        }),
        tap(images => console.log(images)),
      );
  }

  uploadFiles(formData): Observable<any> {
    return this.http.post<any>(environment.projects_api_url + environment.uploadFiles, formData)
      .pipe(
        map(response => {
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].url = environment.projects_api_url.slice(0, -1) + response.data[i].url;
          }
          return response.data;
        }),
        tap(files => console.log(files)),
      );
  }

}
