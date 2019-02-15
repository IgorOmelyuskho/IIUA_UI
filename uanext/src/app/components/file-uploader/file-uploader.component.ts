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
  @Output() filesUploaded = new EventEmitter<boolean>();
  @Output() filesValid = new EventEmitter<boolean>();
  @Input() content: string;
  @Input() minCount = 0;
  @Input() parentSubmitted;

  minCountValid = true;

  constructor(private vendorCompanyService: VendorCompanyService) { }

  ngOnInit() { }

  handleFilesSelect(event) {
    console.log(this.parentSubmitted);
    this.formData = new FormData();
    this.filesArr = [];
    const files = event.target['files'];

    if (files.length > this.minCount) {
      this.minCountValid = true;
    } else {
      this.minCountValid = false;
    }

    for (let i = 0; i < files.length; i++) {
      this.formData.append(files[i].name, files[i]);
      this.filesArr.push(files[i].name);
    }
  }

  subscriber(observable: Observable<any>) {
    observable.subscribe(
      res => {
        console.log(res);
        this.filesIsUploaded = true;
        this.filesUploaded.emit(true);
      },
      err => {
        console.log(err);
        this.filesIsUploaded = true; // remove mat-progress-bar
        this.filesUploaded.emit(false);
      }
    );
  }

  uploadFiles() {
    this.filesIsUploaded = false;
    if (this.content === 'photo') {
      this.subscriber( this.vendorCompanyService.uploadPhotos(this.formData) );
    }
    // if (this.content === 'files') {
    //   this.subscriber( this.vendorCompanyService.uploadFiles(this.formData) );
    // }
    // if (this.content === 'video') {
    //   this.subscriber( this.vendorCompanyService.uploadVideos(this.formData) );
    // }

  }

}
