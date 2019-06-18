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
    return this.http.post<any>(environment.files + '/api/upload/upload', formData)
      .pipe(
        map(response => {
          for (let i = 0; i < response.data.length; i++) { // todo remove
            if (!response.data[i].name) {
              response.data[i].name = 'TEST_NAME.file';
            }
          }
          return response.data;
        })
      );
  }

  getFile(fileId: any): Observable<any> {
    return this.http.get<any>(environment.files + environment.uploadFiles + '/' + fileId)
      .pipe(
        map(response => {
          for (let i = 0; i < response.data.length; i++) { // todo remove
            if (!response.data[i].name) {
              response.data[i].name = 'TEST_NAME.file';
            }
          }
          return response.data;
        })
      );
  }
}
