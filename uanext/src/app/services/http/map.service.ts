import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  post3DObject(formData: FormData): Observable<any> {
    return this.http.post<any>(environment.map + environment.post3DObject, formData);
  }

  get3DObject(id: string): Observable<{ id: string, name: string, path: string }> {
    return this.http.get<any>(environment.map + environment.get3DObject + '/' + id)
      .pipe(
        map(response => response.data)
      );
  }

  postHistoryData(data): Observable<any> {
    return this.http.post<any>(environment.map + environment.postHistoryData, data);
  }

  getLastHistoryCoordinates(): Observable<{ object3DId: string, positionX: string, positionY: string }> {
    return this.http.get<any>(environment.map + environment.getLastHistoryCoordinates)
      .pipe(
        map(response => response.data)
      );
  }

  search3DObject(): Observable<{ id: string, name: string, path: string }> {
    return this.http.get<any>(environment.map + environment.search3DObject)
      .pipe(
        map(response => response.data)
      );
  }

  mapFilteringProjects(filteringProjectRequest): Observable<any> {
    return this.http.post<any>(environment.map + environment.mapFilteringProjects, filteringProjectRequest);
  }
}
