import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { FilesService } from 'src/app/services/http/files.service';
import { FileResponseDto } from 'src/app/models/fileResponseDto';
import { StateService } from 'src/app/services/state/state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vendor-create-update',
  templateUrl: './vendor-create-update.component.html',
  styleUrls: ['./vendor-create-update.component.scss']
})
export class VendorCreateUpdateComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dropArea') dropArea: ElementRef;
  @ViewChild('gallery') gallery: ElementRef;
  filesForUploadCount = 0;
  uploadedFilesArr: FileResponseDto[] = [];
  project: VendorProject;
  projectSteps: any[] = [];
  tieSteps: any[] = [];
  self = 'VendorCreateUpdateComponent';
  showProgress = false;
  comment: string;
  selectedProjectSubscription: Subscription;

  constructor(private filesService: FilesService, private stateService: StateService) { }

  ngOnInit() {
    this.selectedProjectSubscription = this.stateService.selectedVendorProject$.subscribe(
      (val: VendorProject) => {
        if (val !== null) {
          this.project = val;
          this.projectSteps = [...this.project.steps];
          for (let i = 0; i < this.projectSteps.length; i++) {
            this.projectSteps[i].selected = false;
          }
        }
      }
    );
  }

  ngAfterViewInit() {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.dropArea.nativeElement.addEventListener(eventName, this.preventDefaults.bind(this), false);
      document.body.addEventListener(eventName, this.preventDefaults.bind(this), false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      this.dropArea.nativeElement.addEventListener(eventName, this.highlight.bind(this), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      this.dropArea.nativeElement.addEventListener(eventName, this.unhighlight.bind(this), false);
    });

    this.dropArea.nativeElement.addEventListener('drop', this.handleDrop.bind(this), false);
  }

  tieToStep(step: any) {
    this.tieSteps = [];
    step.selected = !step.selected;

    for (let i = 0; i < this.projectSteps.length; i++) {
      if (this.projectSteps[i].selected === true) {
        this.tieSteps.push(this.projectSteps[i]);
      }
    }
  }

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  highlight(e) {
    this.dropArea.nativeElement.classList.add('highlight');
  }

  unhighlight(e) {
    this.dropArea.nativeElement.classList.remove('active');
  }

  handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    this.handleFiles(files);
  }

  handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      this.uploadFileSubscriber(files[i]);
      this.previewFile(files[i]);
    }
  }

  previewFile(file: any) {
    const fileType = this.filesService.defineFileType(file.name);

    if (fileType === 'image') {
      this.isImage(file);
    }
    if (fileType === 'video') {
      this.isVideo(file);
    }
    if (fileType === 'file') {
      this.isFile(file);
    }
  }

  isImage = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      img.src = reader.result as string;
      figure.appendChild(img);
      this.gallery.nativeElement.appendChild(figure);
    };
  }

  isVideo = (file: any) => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = '../../../../assets/img/video-image.png';
    figure.appendChild(img);
    this.gallery.nativeElement.appendChild(figure);
  }

  isFile = (file: any) => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = '../../../../assets/img/file.png';
    figure.appendChild(img);
    this.gallery.nativeElement.appendChild(figure);
  }

  uploadFileSubscriber(file) {
    this.filesForUploadCount += 1;
    this.showProgress = true;
    const formData = new FormData();
    formData.append(file.name, file);

    this.filesService.uploadFiles(formData).subscribe(
      (val: FileResponseDto[]) => {
        this.uploadedFilesArr.push(val[0]);
        if (this.allFilesUploaded() === true) {
          this.showProgress = false;
        }
      },
      err => {
        console.warn(err);
      }
    );
  }

  allFilesUploaded(): boolean {
    if (this.filesForUploadCount === this.uploadedFilesArr.length) {
      return true;
    }

    return false;
  }

  send() {
    // http request
    console.log(this.comment);
    console.log(this.uploadedFilesArr);
    console.log(this.tieSteps);

    this.comment = '';
    this.filesForUploadCount = 0;
    this.uploadedFilesArr = [];
    this.tieSteps = [];
    for (let i = 0; i < this.projectSteps.length; i++) {
      this.projectSteps[i].selected = false;
    }

    const elementsForRemove = this.gallery.nativeElement.querySelectorAll('figure');
    for (let i = 0; i < elementsForRemove.length; i++) {
      elementsForRemove[i].parentNode.removeChild(elementsForRemove[i]);
    }
  }

  ngOnDestroy() {
    this.selectedProjectSubscription.unsubscribe();
  }
}
