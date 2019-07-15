import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FileResponseDto } from 'src/app/models/fileResponseDto';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  uploadFiles(formData: FormData): Observable<FileResponseDto[]> {
    return this.http.post<any>(environment.files + environment.uploadFiles, formData)
      .pipe(
        map(response => {
          return response.data;
        })
      );
  }

  getFile(fileId: any): Observable<FileResponseDto[]> {
    return this.http.get<any>(environment.files + environment.uploadFiles + '/' + fileId)
      .pipe(
        map(response => {
          return response.data;
        })
      );
  }

  defineFileType(originalFileName: string): string { // image / file / video
    const splitArr = originalFileName.split('.');
    const ext = splitArr[splitArr.length - 1];
    // if (ext === 'image') {
    //   return 'i'
    // }

    return '1';
  }
}
