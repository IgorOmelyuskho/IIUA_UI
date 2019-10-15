import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { GeoObject, FilterFields } from 'src/app/models';
import { FileResponseDto } from 'src/app/models/fileResponseDto';
import { Object3DDto } from 'src/app/models/object3DDto';
import { HistoryPositionDto } from 'src/app/models/historyPositionDto';
import { FilteredProjectsService } from './filtered-projects.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient, private filteredProjectsService: FilteredProjectsService) { }

  post3DObject(object3DDto: Object3DDto): Observable<any> {
    return this.http.post<any>(environment.map + environment.post3DObject, object3DDto);
  }

  get3DObject(objectId: string | number): Observable<Object3DDto> {
    const params = new HttpParams().set('objectId', objectId.toString());
    return this.http.get<any>(environment.map + environment.get3DObject, { params: params });
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

  mapFilteringProjects(filter: FilterFields): Observable<Object3DDto> {
    filter = this.filteredProjectsService.fixFilterForBackend(filter);
    return this.http.post<any>(environment.map + environment.mapFilteringProjects, filter);
  }

  getGeoModels(page: number, count: number): Observable<FileResponseDto[]> {
    // let params = new HttpParams();
    // params = params.append('page', page.toString());
    // params = params.append('count', count.toString());
    // return this.http.get<any>(environment.chat + environment.getGeoModels, { params: params });
    const userGeoObject0: FileResponseDto = {
      id: 'building1',
      url: window.location.origin + '/assets/objects/models/building1.zip',
      originalName: 'building1',
    };
    const userGeoObject1: FileResponseDto = {
      id: 'building2',
      url: window.location.origin + '/assets/objects/models/building2.zip',
      originalName: 'building2',
    };
    const userGeoObject2: FileResponseDto = {
      id: 'kiosk1',
      url: window.location.origin + '/assets/objects/models/kiosk1.zip',
      originalName: 'kiosk1',
    };
    const userGeoObject3: FileResponseDto = {
      id: 'skyscraper',
      url: window.location.origin + '/assets/objects/models/skyscraper.zip',
      originalName: 'skyscraper',
    };
    const userGeoObject4: FileResponseDto = {
      id: 'building3',
      url: window.location.origin + '/assets/objects/models/building3.zip',
      originalName: 'building3',
    };
    return of([userGeoObject0, userGeoObject1, userGeoObject2, userGeoObject3, userGeoObject4]);
  }

  updateGeoObjectSettings(historyPosition: HistoryPositionDto): Observable<any> {
    return this.http.put<any>(environment.map + environment.updateGeoObjectSettings, historyPosition);
  }
}
