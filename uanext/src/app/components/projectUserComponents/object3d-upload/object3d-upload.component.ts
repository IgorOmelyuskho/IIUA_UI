import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapService } from 'src/app/services/http/map.service';

@Component({
  selector: 'app-object3d-upload',
  templateUrl: './object3d-upload.component.html',
  styleUrls: ['./object3d-upload.component.scss']
})
export class Object3dUploadComponent implements OnInit {
  formData: FormData;
  file: any;

  constructor(private http: HttpClient, private mapService: MapService) { }

  ngOnInit() {
  }

  filesChange(e) {
    this.file = e.target['files'][0];
  }

  uploadFile() {
    if (this.file == null) {
      return;
    }

    this.formData = new FormData();
    this.formData.append(this.file.name, this.file);

    this.mapService.post3DObject(this.formData).subscribe(
      response => {
        console.log(response);
      },
      err => {
        console.warn(err);
      }
    );
  }
}
