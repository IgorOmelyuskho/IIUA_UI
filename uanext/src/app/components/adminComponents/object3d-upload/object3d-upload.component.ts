import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilesService } from 'src/app/services/http/files.service';

@Component({
  selector: 'app-object3d-upload',
  templateUrl: './object3d-upload.component.html',
  styleUrls: ['./object3d-upload.component.scss']
})
export class Object3dUploadComponent implements OnInit {
  formData: FormData;
  fileForUpload: any;
  files: any[];
  showProgressBar = false;

  constructor(private http: HttpClient, private filesService: FilesService) { }

  ngOnInit() {
    // this.upload3dModelService.fetchAll3dModels().subscribe(
    //   response => {
    //     console.log(response);
    //     // this.files = response.data;
    //   },
    //   err => {
    //     console.warn(err);
    //   }
    // );
  }

  filesChange(e) {
    this.fileForUpload = e.target['files'][0];
  }

  uploadFile() {
    this.showProgressBar = true;

    if (this.fileForUpload == null) {
      return;
    }

    this.formData = new FormData();
    this.formData.append(this.fileForUpload.name, this.fileForUpload);

    this.filesService.uploadFiles(this.formData).subscribe(
      response => {
        console.log(response);
        // add uploaded file in this.files
        this.showProgressBar = false;
      },
      err => {
        console.warn(err);
        this.showProgressBar = false;
      }
    );
  }

  // removeFile(file) {
  //   this.upload3dModelService.remove3dModel().subscribe(
  //     response => {
  //       console.log(response);
  //       // remove file from this.files
  //     },
  //     err => {
  //       console.warn(err);
  //     }
  //   );
  // }
}
