import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  uploadFiles(formData: FormData): Observable<any> {
    return this.http.post<any>(environment.files + environment.uploadFiles, formData)
      .pipe(
        map(response => {
          return response.data;
        })
      );
  }

  getFile(fileId: any): Observable<any> {
    return this.http.get<any>(environment.files + environment.uploadFiles + '/' + fileId)
      .pipe(
        map(response => {
          return response.data;
        })
      );
  }
}
