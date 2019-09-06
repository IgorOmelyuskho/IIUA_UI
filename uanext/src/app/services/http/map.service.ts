import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { GeoObject } from 'src/app/models';
import { FileResponseDto } from 'src/app/models/fileResponseDto';
import { Object3DDto } from 'src/app/models/object3DDto';
import { HistoryPositionDto } from 'src/app/models/historyPositionDto';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  post3DObject(object3DDto: Object3DDto): Observable<any> {
    return this.http.post<any>(environment.map + environment.post3DObject, object3DDto);
  }

  get3DObject(id: string): Observable<{ id: string, name: string, path: string }> {
    return this.http.get<any>(environment.map + environment.get3DObject + '/' + id)
      .pipe(
        map(response => response.data)
      );
  }

  postHistoryData(historyPositionDto: HistoryPositionDto): Observable<any> {
    return this.http.post<any>(environment.map + environment.postHistoryData, historyPositionDto);
  }

  getLastHistoryCoordinates(): Observable<HistoryPositionDto> {
    return this.http.get<any>(environment.map + environment.getLastHistoryCoordinates);
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

  getGeoModels(page: number, count: number): Observable<FileResponseDto[]> {
    // let params = new HttpParams();
    // params = params.append('page', page.toString());
    // params = params.append('count', count.toString());
    // return this.http.get<any>(environment.chat + environment.getGeoModels, { params: params });
    const userGeoObject1: FileResponseDto = {
      id: 'file-response-id-1',
      url: window.location.origin + '/assets/objects/low-poly-building.zip',
      originalName: 'building1',
    };
    const userGeoObject2: FileResponseDto = {
      id: 'file-response-id-2',
      url: window.location.origin + '/assets/objects/low-poly-building.zip',
      originalName: 'building2',
    };
    const userGeoObject3: FileResponseDto = {
      id: 'file-response-id-3',
      url: window.location.origin + '/assets/objects/low-poly-building.zip',
      originalName: 'building3',
    };
    const userGeoObject4: FileResponseDto = {
      id: 'file-response-id-4',
      url: window.location.origin + '/assets/objects/low-poly-building.zip',
      originalName: 'building4',
    };
    const userGeoObject5: FileResponseDto = {
      id: 'file-response-id-5',
      url: window.location.origin + '/assets/objects/low-poly-building.zip',
      originalName: 'building5',
    };
    return of([userGeoObject1, userGeoObject2, userGeoObject3, userGeoObject4, userGeoObject5]);
  }

  updateGeoObjectSettings(historyPosition: HistoryPositionDto): Observable<any> {
    return this.http.put<any>(environment.map + environment.updateGeoObjectSettings, historyPosition);
  }
}
