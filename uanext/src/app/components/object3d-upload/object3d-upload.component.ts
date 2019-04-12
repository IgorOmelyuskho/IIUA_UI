import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Upload3dModelService } from 'src/app/services/upload3dmodel/upload-3d-model.service';

@Component({
  selector: 'app-object3d-upload',
  templateUrl: './object3d-upload.component.html',
  styleUrls: ['./object3d-upload.component.scss']
})
export class Object3dUploadComponent implements OnInit {
  formData: FormData;
  files: any[];
  models: any[] = [
    {name: 'name1', id: 'id1', paths: [Math.random(), Math.random(), Math.random(), Math.random()]},
    {name: 'name2', id: 'id2', paths: [Math.random(), Math.random(), Math.random(), Math.random()]},
    {name: 'name3', id: 'id3', paths: [Math.random(), Math.random(), Math.random(), Math.random()]},
    {name: 'name4', id: 'id4', paths: [Math.random(), Math.random(), Math.random(), Math.random()]},
    {name: 'name5', id: 'id5', paths: [Math.random(), Math.random(), Math.random(), Math.random()]},
  ];

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
    this.files = e.target['files'];
    console.log(this.files);
  }

  uploadFiles() {
    if (this.files == null || this.files.length === 0) {
      console.log('Choose files');
      return;
    }

    this.formData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      this.formData.append(this.files[i].name, this.files[i]);
    }

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
    // for (let i = 0; i < this.uploadedFiles.length; i++) {
    //   if (this.uploadedFiles[i].id === file.id) {
    //     this.uploadedFiles.splice(i, 1);
    //     return;
    //   }
    // }
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
