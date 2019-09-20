import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { MatProgressBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { TranslateService } from 'src/app/services/translate.service';
import { FilesService } from 'src/app/services/http/files.service';
import { FileResponseDto } from 'src/app/models/fileResponseDto';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-vendor-investment-offer',
  templateUrl: './vendor-investment-offer.component.html',
  styleUrls: ['./vendor-investment-offer.component.scss']
})
export class VendorInvestmentOfferComponent implements OnInit, AfterViewInit, OnDestroy {
  project: VendorProject;
  selectedProjectSubscription: Subscription;
  @ViewChild('dropArea') dropArea: ElementRef;
  @ViewChild('gallery') gallery: ElementRef;
  self = 'VendorInvestmentOfferComponent';
  action = 'CreateInvestmentOffer'; // CreateInvestmentOffer - default, ShowHistory
  region = 'ALL';
  budget: string;
  shortDescription: string;
  detailedDescription: string;
  projectSteps: any[] = [];
  tieSteps: any[] = [];
  regionOptions;
  regionSubscription: Subscription;
  filesForUploadCount = 0;
  showProgress = false;
  uploadedFilesArr: FileResponseDto[] = [];

  constructor(private translateService: TranslateService, private filesService: FilesService, private stateService: StateService) { }

  ngOnInit() {
    this.regionSubscription = this.translateService.region.subscribe(
      val => {
        this.regionOptions = JSON.parse(JSON.stringify(val));
      }
    );

    this.selectedProjectSubscription = this.stateService.selectedVendorProject$.subscribe(
      (val: VendorProject) => {
        if (val !== null) {
          this.project = val;
          // this.projectSteps = [...this.project.steps];
          for (let i = 0; i < this.projectSteps.length; i++) {
            this.projectSteps[i].selected = false;
          }
        }
      },
      err => {
        console.warn(err);
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
    console.log(this.budget);
    console.log(this.region);
    console.log(this.tieSteps);
    console.log(this.shortDescription);
    console.log(this.detailedDescription);
    console.log(this.uploadedFilesArr);

    this.budget = '';
    this.region = '';
    this.shortDescription = '';
    this.detailedDescription = '';
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

  createInvestmentOffer() {
    // todo
  }

  viewHistory() {
    // todo
  }

  ngOnDestroy() {
    this.regionSubscription.unsubscribe();
    this.selectedProjectSubscription.unsubscribe();
  }
}





