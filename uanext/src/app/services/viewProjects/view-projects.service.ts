import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ViewVendorProject } from 'src/app/models/viewVendorProject';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { FilteredProjects } from 'src/app/models';

const fakeProject: ViewVendorProject = { // todo remove
  'id': 135,
  'userId': 88,
  'name': 'test_steps',
  'legalEntityName': 'legalEntityName',
  'goal': 'goalgoalgoalgoalgoalgoalg  ggoalgoalgoalgoalgoalgo alggoalgoalgoalgoalgoa lgoalggoalgoalgoalgoalgoal goalggoalgoalgoalg' +
    'goalgoalgoalgoalgoalgoalg  ggoalgoalgoalgoalgoalgo alggoalgoalgoalgoalgoa lgoalggoalgoalgoalgoalgoal goalggoalgoalgoalg',
  'region': 'region',
  'fieldOfActivity': 'fieldOfActivity',
  'companyAge': 1,
  'employeesNumber': '100+',
  'employeesToHire': 10,
  'grossIncome': '100',
  'averageCheck': 1000.00,
  'mounthlyClients': 100,
  'averagePrice': 100.00,
  'description': 'description',
  'moneyRequired': 100000.00,
  'investmentDescription': 'investmentDescription investmentDescription investmentDescription investmentDescription ' +
    'investmentDescription investmentDescription investmentDescription investmentDescription investmentDescription investmentDescription',
  'steps': [
    {
      'id': 992094,
      'stepNumber': 0,
      'data': 'steps11 steps11 steps11 steps11 steps11 steps11 steps11'
    },
    {
      'id': 992095,
      'stepNumber': 1,
      'data': 'step22 step22 step22 step22 step22 step22 step22 step22 step22'
    },
    {
      'id': 992096,
      'stepNumber': 2,
      'data': 'step33 step33 step33 step33 step33 step33 step33 step33 step33 step33 step33 step33 step33 step33 step33 step33 step33'
    },
    {
      'id': 992097,
      'stepNumber': 3,
      'data': 'steps11 steps11 steps11 steps11 steps11 steps11 steps11'
    },
    {
      'id': 992098,
      'stepNumber': 4,
      'data': 'steps11 steps11 steps11 steps11 steps11 steps11 steps11'
    }],
  'videos': [
    {
      'id': 147,
      'url': 'https://www.youtube.com/watch?v=0G-vP5-pIpI',
      'projectId': 135
    },
    {
      'id': 148,
      'url': 'https://www.youtube.com/watch?v=0G-vP5-pIpI',
      'projectId': 135
    }],
  'avatara':
  {
    'id': 806,
    'url': '/files/8af9dc9d-0baa-4ac0-aa87-da2fea717fc6.jpg',
    'name': '8af9dc9d-0baa-4ac0-aa87-da2fea717fc6.jpg',
    'accessFile': 1
  },
  'images': [
    {
      'id': 807,
      'url': '/files/9d7eebb8-0e8a-46a9-8ddf-cc4165392f54.jpg',
      'name': '9d7eebb8-0e8a-46a9-8ddf-cc4165392f54.jpg',
      'accessFile': 1
    },
    {
      'id': 808,
      'url': '/files/4664deb5-edf6-43dc-aa14-fcca0acfe7a1.jpg',
      'name': '4664deb5-edf6-43dc-aa14-fcca0acfe7a1.jpg',
      'accessFile': 1
    },
    {
      'id': 809,
      'url': '/files/eb578653-0ecf-4f16-8839-e914258a50ea.jpg',
      'name': 'eb578653-0ecf-4f16-8839-e914258a50ea.jpg',
      'accessFile': 1
    },
    {
      'id': 810,
      'url': '/files/0ce73fc3-2458-48b7-ae6c-0c36c9beda9f.png',
      'name': '0ce73fc3-2458-48b7-ae6c-0c36c9beda9f.png',
      'accessFile': 1
    },
    {
      'id': 811,
      'url': '/files/9c769856-5522-42a6-8857-09f107e88ad1.png',
      'name': '9c769856-5522-42a6-8857-09f107e88ad1.png',
      'accessFile': 1
    },
    {
      'id': 812,
      'url': '/files/9d7eebb8-0e8a-46a9-8ddf-cc4165392f54.jpg',
      'name': '9d7eebb8-0e8a-46a9-8ddf-cc4165392f54.jpg',
      'accessFile': 1
    },
    {
      'id': 813,
      'url': '/files/4664deb5-edf6-43dc-aa14-fcca0acfe7a1.jpg',
      'name': '4664deb5-edf6-43dc-aa14-fcca0acfe7a1.jpg',
      'accessFile': 1
    },
    {
      'id': 814,
      'url': '/files/eb578653-0ecf-4f16-8839-e914258a50ea.jpg',
      'name': 'eb578653-0ecf-4f16-8839-e914258a50ea.jpg',
      'accessFile': 1
    },
    {
      'id': 815,
      'url': '/files/0ce73fc3-2458-48b7-ae6c-0c36c9beda9f.png',
      'name': '0ce73fc3-2458-48b7-ae6c-0c36c9beda9f.png',
      'accessFile': 1
    },
    {
      'id': 816,
      'url': '/files/9c769856-5522-42a6-8857-09f107e88ad1.png',
      'name': '9c769856-5522-42a6-8857-09f107e88ad1.png',
      'accessFile': 1
    }],
  'files': [
    {
      'id': 812,
      'url': '/files/335189ed-595a-48bf-b4bd-bee50185175a.txt',
      'name': '335189ed-595a-48bf-b4bd-bee50185175a.txt',
      'accessFile': 1
    },
    {
      'id': 813,
      'url': '/files/64b1569c-90ae-4872-8566-6b5350eeb59d.txt',
      'name': '64b1569c-90ae-4872-8566-6b5350eeb59d.txt',
      'accessFile': 1
    },
    {
      'id': 813,
      'url': '/files/64b1569c-90ae-4872-8566-6b5350eeb59d.txt',
      'name': '64b1569c-90ae-4872-8566-6b5350eeb59d.txt',
      'accessFile': 1
    }
  ]
};

const emptyFilteredProjects = {
  pages: 0,
  projectsCount: 0,
  projectsList: []
};

@Injectable({
  providedIn: 'root'
})
export class ViewProjectsService {

  projectForView: ViewVendorProject = null; // initial when click on selected project

  constructor(private http: HttpClient) { }

  // replaceLinks(project: ViewVendorProject): ViewVendorProject {
  //   // avatara
  //   try { // todo - drop in database all projects with avatara === null
  //     project.avatara.url = environment.projects_api_url.slice(0, -1) + project.avatara.url;
  //   } catch {
  //     project.avatara = {};
  //     project.avatara.url = 'http://proxy.alexduxa.online/projects/files/feff0d66-dbf6-4669-a1d7-2c8d81439d57.jpg';
  //   }

  //   // images
  //   for (let img = 0; img < project.images.length; img++) {
  //     try { // todo
  //       project.images[img].url = environment.projects_api_url.slice(0, -1) + project.images[img].url;
  //     } catch {
  //       project.images[img] = {};
  //       project.images[img].url = 'http://proxy.alexduxa.online/projects/files/feff0d66-dbf6-4669-a1d7-2c8d81439d57.jpg';
  //     }
  //   }

  //   // files
  //   for (let f = 0; f < project.files.length; f++) {
  //     try { // todo
  //       project.files[f].url = environment.projects_api_url.slice(0, -1) + project.files[f].url;
  //     } catch {
  //       project.files[f] = {};
  //       project.files[f].url = 'http://proxy.alexduxa.online/projects/files/b3ae48a6-66f9-4492-a2d9-ddd34e45c7f3.txt';
  //     }
  //   }

  //   return project;
  // }

  searchByFilter(filter: any = {}): Observable<FilteredProjects> {
    return this.http.post<FilteredProjects>(environment.projects_api_url + environment.filteringProjects, filter)
      // return of([JSON.parse(JSON.stringify(fakeProject)), JSON.parse(JSON.stringify(fakeProject))])
      .pipe(
        map((response: any) => {
          if (response['data'] == null) {
            return emptyFilteredProjects;
          }
          return response['data'];
        }),
        // map((filteredProjects: FilteredProjects) => {
        //   console.log(filteredProjects);
        //   for (let i = 0; i < filteredProjects.projectsList.length; i++) {
        //     this.replaceLinks(filteredProjects.projectsList[i]);
        //   }

        //   return filteredProjects;
        // }),
        catchError(val => of(emptyFilteredProjects))
      );
  }

  // fetchVendorProjects(): Observable<ViewVendorProject[]> {
  //   return this.http.get<ViewVendorProject[]>(environment.projects_api_url + environment.vendorProject)
  //   // return of(JSON.parse(JSON.stringify(fakeProject))) //  todo
  //     .pipe(
  //       tap(res => {
  //         console.log(res);
  //       }),
  //       map(response => {
  //         return response['data'];
  //       })
  //       // map((project: ViewVendorProject) => {
  //       //   return this.replaceLinks(project);
  //       // })
  //     );
  // }

  searchByProjectName(name: string, pageSize: number, page: number): Observable<FilteredProjects> {
    return this.http.post<FilteredProjects>(environment.projects_api_url + environment.filteringProjects, {
      projectName: name,
      pageSize,
      page
    })
      .pipe(
        map(response => {
          if (response['data'] == null) {
            return emptyFilteredProjects;
          }
          return response['data'];
        }),
        // map((filteredProjects: FilteredProjects) => {
        //   console.log(filteredProjects);
        //   for (let i = 0; i < filteredProjects.projectsList.length; i++) {
        //     this.replaceLinks(filteredProjects.projectsList[i]);
        //   }

        //   return filteredProjects;
        // }),
        catchError(val => of(emptyFilteredProjects))
      );
  }

  searchByCompanyName(name: string, pageSize: number, page: number): Observable<FilteredProjects> {
    return this.http.post<FilteredProjects>(environment.projects_api_url + environment.filteringProjects, {
      companyName: name,
      pageSize,
      page
    })
      .pipe(
        map(response => {
          if (response['data'] == null) {
            return emptyFilteredProjects;
          }
          return response['data'];
        }),
        // map((filteredProjects: FilteredProjects) => {
        //   console.log(filteredProjects);
        //   for (let i = 0; i < filteredProjects.projectsList.length; i++) {
        //     this.replaceLinks(filteredProjects.projectsList[i]);
        //   }

        //   return filteredProjects;
        // }),
        catchError(val => of(emptyFilteredProjects))
      );
  }

  searchByKeyword(keyword: string, pageSize: number, page: number): Observable<FilteredProjects> {
    return this.http.post<FilteredProjects>(environment.projects_api_url + environment.filteringProjects, {
      keyWord_TODO_NAME: keyword,
      pageSize,
      page
    })
      .pipe(
        map(response => {
          if (response['data'] == null) {
            return emptyFilteredProjects;
          }
          return response['data'];
        }),
        // map((filteredProjects: FilteredProjects) => {
        //   console.log(filteredProjects);
        //   for (let i = 0; i < filteredProjects.projectsList.length; i++) {
        //     this.replaceLinks(filteredProjects.projectsList[i]);
        //   }

        //   return filteredProjects;
        // }),
        catchError(val => of(emptyFilteredProjects))
      );
  }
}