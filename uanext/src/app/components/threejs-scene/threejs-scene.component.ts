import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FileResponseDto } from 'src/app/models/fileResponseDto';
import { VendorProject } from 'src/app/models/vendorProject';
import { Object3DDto } from 'src/app/models/object3DDto';
import { StateService } from 'src/app/services/state.service';
import { MapService } from 'src/app/services/http/map.service';

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
  @ViewChild('elementForCopy') elementForCopy: ElementRef;
  elemCopy: HTMLElement;

  constructor(private stateService: StateService, private mapService: MapService) { }

  ngOnInit() {
    console.log(this.object3DResponse['imgUrl']);
  }

  disableDefaultDragStart() {
    return false;
  }

  windowMouseMoveHandler = (event) => {
    this.elemCopy.style.display = 'block';
    this.elemCopy.style.left = event.pageX - this.elemCopy.offsetWidth / 2 + 'px';
    this.elemCopy.style.top = event.pageY - this.elemCopy.offsetHeight / 2 + 'px';
  }

  windowMouseUpHandler = (event) => {
    window.removeEventListener('mousemove', this.windowMouseMoveHandler);
    window.removeEventListener('mouseup', this.windowMouseUpHandler);
    document.body.removeChild(this.elemCopy);
    this.stateService.dragStarted = false;
    this.stateService.object3DAndProject = null;
  }

  dragStart(event) {
    this.elemCopy = this.elementForCopy.nativeElement.cloneNode(true);
    this.elemCopy.style.display = 'none';
    this.elemCopy.style.position = 'absolute';
    this.elemCopy.style.zIndex = '100000000';
    this.elemCopy.style.pointerEvents = 'none';
    this.elemCopy.style.opacity = '0.7';

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
    this.stateService.dragStarted = true;

    document.body.appendChild(this.elemCopy);
    window.addEventListener('mousemove', this.windowMouseMoveHandler);
    window.addEventListener('mouseup', this.windowMouseUpHandler);
  }

  setMyStyles() {
    const styles = {
      'background-image': 'url(' + this.object3DResponse['imgUrl'] + ')',
    };
    return styles;
  }
}
