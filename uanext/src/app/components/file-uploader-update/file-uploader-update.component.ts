import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { VendorCompanyService } from 'src/app/services/vendorCompany/vendor-company.service';

@Component({
  selector: 'app-file-uploader-update',
  templateUrl: './file-uploader-update.component.html',
  styleUrls: ['./file-uploader-update.component.scss']
})
export class FileUploaderUpdateComponent implements OnInit {
  formData: FormData;
  filesArr: any[];
  filesIsUploaded = true;
  showProgress = false;
  files: any[];
  unTouched = true;
  isLoaded = false;
  @Output() filesUploadedEvent = new EventEmitter<boolean>();
  @Input() content: string; // required
  @Input() minCount = 0;
  @Input() maxCount = 1000;
  @Input() maxSize = 5 * 1024 * 1024;
  @Input() accept = '*';

  constructor(private vendorCompanyService: VendorCompanyService) { }

  ngOnInit() {
    // todo remove if data get from parent component, and add @Input() for get data
    if (this.content === 'photos') {
      this.fetchSubscriber(this.vendorCompanyService.fetchPhotos());
    }
    if (this.content === 'files') {
      this.fetchSubscriber(this.vendorCompanyService.fetchFiles());
    }
  }

  fetchSubscriber(observable: Observable<any>) {
    observable.subscribe(
      res => {
        console.log(res);
        this.isLoaded = true;
      },
      err => {
        console.log(err);
        this.isLoaded = true; // todo
      }
    );
  }

  minCountValid(): boolean {
    return true; // todo calc files from server + local files
  }

  maxCountValid(): boolean {
    return true; // todo calc files from server + local files
  }

  maxSizeValid(): boolean {
    if (!!this.files === false || this.files.length === 0) {
      return true;
    }

    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i].size == null) {
        this.files[i].size = -1;
      }
      if (this.files[i].size > this.maxSize) {
        return false;
      }
    }

    return true;
  }

  allFieldsValid(): boolean {
    if (this.minCountValid() === true && this.maxSizeValid() === true && this.maxCountValid() === true) {
      return true;
    } else {
      return false;
    }
  }

  handleFilesSelect(event) {
    this.unTouched = false;
    this.filesIsUploaded = false;
    this.formData = new FormData();
    this.filesArr = [];
    this.files = event.target['files'];

    for (let i = 0; i < this.files.length; i++) {
      this.formData.append(this.files[i].name, this.files[i]);
      this.filesArr.push(this.files[i]);
    }
  }

  showProgressBar(show: boolean) {
    if (show === true) {
      this.showProgress = true;
    } else {
      this.showProgress = false;
    }
  }

  subscriber(observable: Observable<any>) {
    observable.subscribe(
      res => {
        console.log(res);
        this.filesIsUploaded = true;
        this.showProgressBar(false);
        this.filesUploadedEvent.emit(true);
      },
      err => {
        console.log(err);
        // this.filesIsUploaded = false; // todo
        // this.showProgressBar(false);
        // this.filesUploadedEvent.emit(false);
        this.filesIsUploaded = true;
        this.showProgressBar(false);
        this.filesUploadedEvent.emit(true);
      }
    );
  }

  uploadFiles() {
    if (!this.files || this.files.length === 0) {
      return;
    }

    this.filesIsUploaded = false;
    this.showProgressBar(true);

    if (this.content === 'photos') {
      this.subscriber(this.vendorCompanyService.uploadPhotos(this.formData));
    }
    if (this.content === 'files') {
      this.subscriber(this.vendorCompanyService.uploadFiles(this.formData));
    }
    if (this.content === 'videos') {
      this.subscriber(this.vendorCompanyService.uploadVideos(this.formData));
    }
  }

}
