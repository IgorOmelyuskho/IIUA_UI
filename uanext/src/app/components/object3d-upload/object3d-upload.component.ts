import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-object3d-upload',
  templateUrl: './object3d-upload.component.html',
  styleUrls: ['./object3d-upload.component.scss']
})
export class Object3dUploadComponent implements OnInit {
  formData: FormData;
  files: any[];
  uploadedFiles: any[] = [
    {name: 'name1', id: 'id1'},
    {name: 'name2', id: 'id2'},
    {name: 'name3', id: 'id3'},
    {name: 'name4', id: 'id4'},
    {name: 'name5', id: 'id5'},
  ];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  filesChange(e) {
    this.files = e.target['files'];
    console.log(this.files);
  }

  uploadFiles() {
    this.formData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      this.formData.append(this.files[i].name, this.files[i]);
    }

    // this.http.post()
    // .subscribe(
    //   res => {
    //     console.log(res);
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
  }

  removeFile(file) {
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      if (this.uploadedFiles[i].id === file.id) {
        this.uploadedFiles.splice(i, 1);
        return;
      }
    }
  }

  showFile(file) {
    console.log(file);
  }

}
