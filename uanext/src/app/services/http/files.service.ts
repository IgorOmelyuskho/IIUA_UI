import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  uploadFiles(formData: FormData): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');

    return this.http.post<any>(environment.files + environment.uploadFiles, formData, {headers: headers})
      .pipe(
        map(response => {
          return response.data;
        })
      );
  }

  getFile(fileId: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'multipart/form-data');

    return this.http.get<any>(environment.files + environment.uploadFiles + '/' + fileId, {headers: headers})
      .pipe(
        map(response => {
          return response.data;
        })
      );
  }
}
