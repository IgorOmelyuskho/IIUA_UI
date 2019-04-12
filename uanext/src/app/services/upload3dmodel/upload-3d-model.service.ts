import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Upload3dModelService {

  constructor(private http: HttpClient) { }

  upload3dModel(formData: FormData): Observable<any> {
    return this.http.post<any>(environment.projects_api_url + 'todo_url', formData) // todo
      .pipe(
        map(response => {
          return response.data;
        })
      );
  }

  remove3dModel(keys: string[]): Observable<any> {
    // for key in keys, maybe Promise.all(forkjoin)
    return this.http.post<any>(environment.projects_api_url + 'todo_url', keys) // todo
      .pipe(
        map(response => {
          return response.data;
        })
      );
  }

  fetchAll3dModels(): Observable<any> {
    return this.http.post<any>(environment.projects_api_url + 'todo_url', {}) // todo
      .pipe(
        map((response: any[]) => {
          return response;
        })
      );
  }
}
