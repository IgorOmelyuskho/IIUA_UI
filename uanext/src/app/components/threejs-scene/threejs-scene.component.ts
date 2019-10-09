import { Component, OnInit, Input } from '@angular/core';
import { FileResponseDto } from 'src/app/models/fileResponseDto';
import { VendorProject } from 'src/app/models/vendorProject';
import { Object3DDto } from 'src/app/models/object3DDto';
import { StateService } from 'src/app/services/state.service';

export interface Object3DAndProject {
  object3DDto: Object3DDto;
  project: VendorProject;
}

@Component({
  selector: 'app-threejs-scene',
  templateUrl: './threejs-scene.component.html',
  styleUrls: ['./threejs-scene.component.scss']
})
export class ThreejsSceneComponent implements OnInit {
  @Input() object3DResponse: FileResponseDto;
  @Input() project: VendorProject;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    console.log(this.object3DResponse['imgUrl']);
   }

  drag(event) {
    const object3DDto: Object3DDto = {
      // id: this.object3DResponse.id,
      name: this.object3DResponse.originalName,
      path: this.object3DResponse.url,
      projectId: this.project.id
    };
    const object3DAndProject: Object3DAndProject = {
      object3DDto: object3DDto,
      project: this.project
    };
    this.stateService.object3DAndProject = object3DAndProject;
  }

  setMyStyles() {
    const styles = {
      'background-image': 'url(' + this.object3DResponse['imgUrl'] + ')',
    };
    return styles;
  }
}
