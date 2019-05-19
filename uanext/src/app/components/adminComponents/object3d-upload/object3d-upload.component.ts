import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-object3d-upload',
  templateUrl: './object3d-upload.component.html',
  styleUrls: ['./object3d-upload.component.scss']
})
export class Object3dUploadComponent implements OnInit {
  formData: FormData;
  fileForUpload: any;
  files: any[];

  constructor(private http: HttpClient/* , private upload3dModelService: Upload3dModelService */) { }

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

  uploadFiles() {
    if (this.fileForUpload == null) {
      return;
    }

    this.formData = new FormData();
    this.formData.append(this.fileForUpload.name, this.fileForUpload);

    // this.upload3dModelService.upload3dModel(this.formData).subscribe(
    //   response => {
    //     console.log(response);
    //     // add uploaded file in this.files
    //   },
    //   err => {
    //     console.warn(err);
    //   }
    // );
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
