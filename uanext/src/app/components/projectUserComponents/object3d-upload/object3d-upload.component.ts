import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Upload3dModelService } from 'src/app/services/http/upload-3d-model.service';

@Component({
  selector: 'app-object3d-upload',
  templateUrl: './object3d-upload.component.html',
  styleUrls: ['./object3d-upload.component.scss']
})
export class Object3dUploadComponent implements OnInit {
  formData: FormData;
  file: any;

  constructor(private http: HttpClient, private upload3dModelService: Upload3dModelService) { }

  ngOnInit() {
    this.upload3dModelService.fetchAll3dModels().subscribe(
      response => {
        console.log(response);
        // this.models = response.data;
      },
      err => {
        console.warn(err);
      }
    );
  }

  filesChange(e) {
    this.file = e.target['files'][0];
  }

  uploadFiles() {
    if (this.file == null) {
      return;
    }

    this.formData = new FormData();
    this.formData.append(this.file.name, this.file);

    this.upload3dModelService.upload3dModel(this.formData).subscribe(
      response => {
        console.log(response);
      },
      err => {
        console.warn(err);
      }
    );
  }

  removeFile(model) {
    this.upload3dModelService.remove3dModel(['key1', 'key2', 'key3']).subscribe(
      response => {
        console.log(response);
      },
      err => {
        console.warn(err);
      }
    );
  }
}
