import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FileResponseDto } from 'src/app/models/fileResponseDto';
declare const mime: any;

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  uploadFiles(formData: FormData): Observable<FileResponseDto[]> {
    return this.http.post<any>(environment.files + environment.uploadFiles, formData)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  getFile(fileId: any): Observable<FileResponseDto[]> {
    return this.http.get<any>(environment.files + environment.uploadFiles + '/' + fileId)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  defineFileType(originalFileName: string): string { // image / file / video
    const mimeType = mime.getType(originalFileName);
    if (mimeType == null) {
      return 'file';
    }
    if (mimeType.includes('image')) {
      return 'image';
    } else if (mimeType.includes('video')) {
      return 'video';
    } else {
      return 'file';
    }
  }
}
