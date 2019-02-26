import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { VendorCompanyService } from 'src/app/services/vendorCompany/vendor-company.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {
  formData: FormData;
  filesArr: any[];
  filesIsUploaded = true;
  showProgress = false;
  files: any[];
  unTouched = true;
  @Output() filesUploadedEvent = new EventEmitter<boolean>();
  @Input() content: string; // required
  @Input() minCount = 0;
  @Input() maxCount = 1000;
  @Input() maxSize = 5 * 1024 * 1024;
  @Input() parentSubmitted = false;
  @Input() accept = '*';

  constructor(private vendorCompanyService: VendorCompanyService) { }

  ngOnInit() { }

  minCountValid(): boolean {
    if (this.minCount === 0) {
      return true;
    }
    if (this.files && this.files.length >= this.minCount) {
      return true;
    }

    return false;
  }

  maxCountValid(): boolean {
    if (this.maxCount === 1000) {
      return true;
    }
    if (this.files && this.files.length <= this.maxCount) {
      return true;
    }

    return false;
  }

  maxSizeValid(): boolean {
    if (!!this.files === false || this.files.length === 0) {
      return true;
    }

    for (let i = 0; i < this.files.length; i++) {
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
        // this.filesUploadedEvent.emit(false); // EMIT FILES[]
        this.filesIsUploaded = true;
        this.showProgressBar(false);
        this.filesUploadedEvent.emit(true); // EMIT FILES[]
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
  }

}
