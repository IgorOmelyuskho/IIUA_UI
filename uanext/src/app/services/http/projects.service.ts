import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap, delay } from 'rxjs/operators';
import { VendorProject } from 'src/app/models/vendorProject';
import { responseProject, responseProject2 } from 'src/app/helperClasses/projects';
import { StateService } from '../state/state.service';
import { ProjectGeoObjectDto } from 'src/app/models/projectGeoObjectDto';

const emptyVendorProject: VendorProject = {
  name: '',
  avatara: '',
  legalEntityName: '',
  // goal: '',
  region: '',
  address: '',
  // sphereActivities: [{ id: 1, name: 'string' }],
  // companyAge: 0,
  // employeesNumberMin: 0,
  // employeesNumberMax: 0,
  // employeesToHire: 0,
  // grossIncome: '',
  // averageCheck: 0,
  // mounthlyClients: 0,
  // averagePrice: 0,
  description: '',
  // moneyRequired: 0,
  // investmentDescription: '',
  // steps: [],
  videos: [],
  images: [],
  // files: [],
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
      .pipe(
        map((response: VendorProject[]) => {
          for (let i = 0; i < response.length; i++) {
            response[i].rating = '9.5';
          }
          return response;
        }),
        map((response: VendorProject[]) => { // todo remove
          // this.add3DObjectsArr(response);
          this.addRating(response);
          return this.addAvatara(response);
        }),
      );

    // todo remove
    // return of([responseProject, responseProject2, responseProject, responseProject2, responseProject, responseProject2])
    //   .pipe(
    //     map((val: VendorProject[]) => {
    //       const res = JSON.parse(JSON.stringify(val));
    //       for (let i = 0; i < res.length; i++) {
    //         res[i].id = 'ID' + Math.random();
    //       }
    //       return res;
    //     }),
    //     map((val: VendorProject[]) => {
    //       return this.add3DObjectsArr(val);
    //     }),
    //     delay(50)
    //   );
  }

  createVendorProject(newVendorProject: VendorProject): Observable<any> {
    return this.http.post<any>(environment.projects + environment.vendorProject, newVendorProject);
  }

  updateVendorProject(projectId: number, updatedVendorProject: VendorProject): Observable<any> {
    return this.http.put<any>(environment.projects + environment.vendorProject + projectId, updatedVendorProject);
  }

  getSphereActivity(): Observable<any> {
    return this.http.get<any>(environment.projects + environment.sphereActivity);
  }

  postSphereActivity(sphereActivity): Observable<any> {
    return this.http.post<any>(environment.projects + environment.sphereActivity, sphereActivity);
  }

  setProjectsQueue(param): Observable<any> {
    return this.http.put<any>(environment.projects + environment.changeQueuePosition, param);
  }

  addProjectGeoObject(projectGeoObjectDto: ProjectGeoObjectDto): Observable<any> {
    return this.http.post<any>(environment.projects + environment.addProjectGeoObject, projectGeoObjectDto);
  }

  getProjectsWhenNotAuthorized(): Observable<VendorProject[]> {
    // return of([...responseProjects.projectsList, ...responseProjects.projectsList, ...responseProjects.projectsList]);
    return this.http.get<VendorProject[]>(environment.projects + environment.getLatestProjects)
      .pipe(
        map((response: VendorProject[]) => { // todo remove
          this.addRating(response);
          return this.addAvatara(response);
        })
      );
  }

  getProjectById(projectId: number): Observable<VendorProject> {
    const params = new HttpParams().set('id', projectId.toString());
    return this.http.get<any>(environment.projects + environment.getProjectById, { params: params }).pipe(
      map((project: VendorProject) => { // todo remove
        if (project.avatara == null) {
          const projectWithAvatara: VendorProject = project;
          projectWithAvatara.avatara = {
            id: 1,
            url: window.location.origin + '/assets/img/Network-Profile.png',
            originalName: 'Network-Profile.png'
          };
          return projectWithAvatara;
        }
      })
    );
  }

  removeProjectById(projectId: number): Observable<any> {
    return this.http.delete(environment.projects + environment.removeProject + projectId);
  }

  private addAvatara(projects: VendorProject[]): VendorProject[] {
    for (let i = 0; i < projects.length; i++) {
      if (projects[i].avatara == null) {
        projects[i].avatara = {
          id: 1,
          url: window.location.origin + '/assets/img/Network-Profile.png',
          originalName: 'Network-Profile.png'
        };
      }
    }
    return projects;
  }

  private addRating(filteredProjects: VendorProject[]): VendorProject[] {
    for (let i = 0; i < filteredProjects.length; i++) {
      filteredProjects[i].rating = '9.5';
    }
    return filteredProjects;
  }

  private add3DObjectsArr(filteredProjects: VendorProject[]): VendorProject[] {
    const delta = 0.005;
    for (let i = 0; i < filteredProjects.length; i++) {
      filteredProjects[i].geoObjects = [
        // {
        //   geoObjectId: 'ID-' + Math.random(),
        //   coords: { x: 35.028 + Math.random() * delta, y: 48.4747 + Math.random() * delta },
        //   projectName: filteredProjects[i].name,
        //   pathToZip: window.location.origin + '/assets/objects/tractor.zip',
        //   // pathToZipLP: window.location.origin + '/assets/objects/low-poly-tractor.zip',
        //   project: filteredProjects[i],
        //   canMove: true
        // },
        // {
        //   geoObjectId: 'ID-' + Math.random(),
        //   coords: { x: 35.028 + Math.random() * delta, y: 48.4747 + Math.random() * delta },
        //   projectName: filteredProjects[i].name,
        //   pathToZip: window.location.origin + '/assets/objects/tractor.zip',
        //   // pathToZipLP: window.location.origin + '/assets/objects/low-poly-tractor.zip',
        //   project: filteredProjects[i],
        //   canMove: true
        // },
        // {
        //   geoObjectId: 'ID-' + Math.random(),
        //   coords: { x: 35.028 + Math.random() * delta, y: 48.4747 + Math.random() * delta },
        //   projectName: filteredProjects[i].name,
        //   pathToZip: window.location.origin + '/assets/objects/tractor.zip',
        //   // pathToZipLP: window.location.origin + '/assets/objects/low-poly-tractor.zip',
        //   project: filteredProjects[i],
        //   canMove: true,
        // },
        {
          geoObjectId: 'ID-' + Math.random(),
          coords: { x: 35.028 + Math.random() * delta, y: 48.4747 + Math.random() * delta },
          projectName: filteredProjects[i].name,
          path: window.location.origin + '/assets/objects/low-poly-building.zip',
          // pathToZipLP: window.location.origin + '/assets/objects/low-poly-building.zip',
          project: filteredProjects[i],
          canMove: false,
          scale: Math.random() * 4 + 0.2,
          rotate: Math.random(),
        },
      ];

    }
    return filteredProjects;
  }
}
