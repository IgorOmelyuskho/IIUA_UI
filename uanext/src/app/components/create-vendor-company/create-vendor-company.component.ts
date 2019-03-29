import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VendorCompany } from 'src/app/models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { VendorCompanyService } from 'src/app/services/vendorCompany/vendor-company.service';
import FormHelper from '../../services/helperServices/formHelper';

@Component({
  selector: 'app-create-vendor-company',
  templateUrl: './create-vendor-company.component.html',
  styleUrls: ['./create-vendor-company.component.scss']
})
export class CreateVendorCompanyComponent implements OnInit {
  vendorCompany: VendorCompany = this.vendorCompanyService.emptyVendorCompany;
  vendorCompanyForm: FormGroup;
  submitted = false;
  showProgressBar = false;
  @ViewChild('avatar2') avatarImg: ElementRef;
  FormHelper = FormHelper;

  avatarSize = 0;
  maxAvatarSize = 1024 * 1024 * 5;
  avatarFormData: FormData = new FormData();
  showAvatarProgress = false;
  avatarIsTouched = false;
  avatarData: any;

  minPhotosCount = 5;

  constructor(
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private vendorCompanyService: VendorCompanyService,
  ) {
    this.vendorCompanyForm = this.formBuilder.group({
      name: ['', Validators.required],
      avatar: ['', Validators.required],
      legalEntityName: ['', Validators.required],
      goal: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1024)]], // todo min - 200
      region: ['Kyiv oblast', Validators.required],
      address: ['', Validators.required],
      fieldOfActivity: ['Agriculture, Forestry and Fisheries', Validators.required],
      companyAge: ['', Validators.required],
      employeesNumber: ['1', Validators.required],
      employeesToHire: ['', Validators.required],
      grossIncome: ['100', Validators.required],
      averageCheck: ['', Validators.required],
      mounthlyClients: ['', Validators.required],
      averagePrice: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1024)]],
      moneyRequired: ['', Validators.required],
      investmentDescription: ['', [Validators.required, Validators.maxLength(4096)]],
      forSteps: [''],
      forVideos: [''],
      forPhotos: [''],
      forFiles: [''],
    });
  }

  ngOnInit() { }

  get formControls() {
    return this.vendorCompanyForm.controls;
  }

  stepsEventHandler(e) {
    if (e.error) {
      this.vendorCompanyForm.controls['forSteps'].setErrors({ 'err': true });
      return;
    }

    this.vendorCompany.steps = e;
    this.vendorCompanyForm.controls['forSteps'].setErrors(null);
  }

  videosEventHandler(e) {
    if (e.error) {
      this.vendorCompanyForm.controls['forVideos'].setErrors({ 'err': true });
      return;
    }

    this.vendorCompany.videos = e;
    this.vendorCompanyForm.controls['forVideos'].setErrors(null);
  }

  handleAvatarSelect(event) {
    this.avatarIsTouched = true;

    if (event.target.files == null || event.target.files.length === 0) {
      this.avatarImg.nativeElement['src'] = this.FormHelper.emptyAvatar;
      this.avatarFormData.delete('AVATAR');
      return;
    }

    this.avatarSize = event.target.files[0].size;
    if (this.avatarSize > this.maxAvatarSize) {
      this.vendorCompanyForm.controls['avatar'].setErrors({ 'maxAvatarSizeErr': true });
      this.avatarImg.nativeElement['src'] = this.FormHelper.emptyAvatar;
      return;
    }

    this.vendorCompanyForm.controls['avatar'].setErrors({ 'avatarNotUploaded': true });

    // for show avatar miniature
    const avatarReader = new FileReader();
    avatarReader.onload = (avatar) => {
      this.avatarImg.nativeElement['src'] = avatar.target['result'];
    };
    avatarReader.readAsDataURL(event.target['files'][0]);
    // ....................... //

    const avatarFile = event.target['files'][0];
    this.avatarFormData.append('AVATAR', avatarFile, avatarFile.name);
  }

  showAvatarProgressBar(show: boolean) {
    if (show === true) {
      this.showAvatarProgress = true;
    } else {
      this.showAvatarProgress = false;
    }
  }

  uploadAvatar() {
    this.avatarIsTouched = true;

    if (this.avatarFormData.getAll('AVATAR').length < 1) {
      return;
    }

    this.showAvatarProgressBar(true);

    this.vendorCompanyService.uploadImages(this.avatarFormData)
      .subscribe(
        res => {
          this.avatarData = res[0];
          this.vendorCompanyForm.controls['avatar'].setErrors(null);
          this.avatarFormData.delete('AVATAR');
          this.showAvatarProgressBar(false);
        },
        err => {
          console.warn(err);
          this.avatarFormData.delete('AVATAR');
          this.showAvatarProgressBar(false);
        }
      );
  }

  photosUploaded(event) {
    if (event.error === false) {
      const photosData: any[] = event.files;
      console.log(photosData);
      for (let i = 0; i < photosData.length; i++) {
        this.vendorCompany.images.push(photosData[i]);
      }
    }

    if (event.error === false && this.vendorCompany.images.length >= this.minPhotosCount) {
      this.vendorCompanyForm.controls['forPhotos'].setErrors(null);
    } else {
      this.vendorCompanyForm.controls['forPhotos'].setErrors({ 'err': true });
    }
  }

  removePhotoItem(event) {
    for (let i = 0; i < this.vendorCompany.images.length; i++) {
      if (this.vendorCompany.images[i] === event) {
        this.vendorCompany.images.splice(i, 1);
      }
    }

    if (this.vendorCompany.images.length < this.minPhotosCount) {
      this.vendorCompanyForm.controls['forPhotos'].setErrors({ 'err': true });
    }
  }

  filesUploaded(event) {
    if (event.error === false) {
      const filesData: any[] = event.files;
      for (let i = 0; i < filesData.length; i++) {
        this.vendorCompany.files.push(filesData[i]);
      }
    }
  }

  removeFileItem(event) {
    for (let i = 0; i < this.vendorCompany.files.length; i++) {
      if (this.vendorCompany.files[i] === event) {
        this.vendorCompany.files.splice(i, 1);
      }
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.vendorCompany.steps.length === 0) {
      this.vendorCompanyForm.controls['forSteps'].setErrors({ 'err': true });
    }
    if (this.vendorCompany.videos.length === 0) {
      this.vendorCompanyForm.controls['forVideos'].setErrors({ 'err': true });
    }
    if (this.vendorCompany.images.length < this.minPhotosCount) {
      this.vendorCompanyForm.controls['forPhotos'].setErrors({ 'err': true });
    }

    if (this.vendorCompanyForm.valid === false) {
      return;
    }

    const newVendorCompany: VendorCompany = {
      ...this.vendorCompanyForm.value,
    };

    newVendorCompany.steps = this.vendorCompany.steps;
    newVendorCompany.videos = this.vendorCompany.videos;
    newVendorCompany.avatara = this.avatarData;
    newVendorCompany.images = this.vendorCompany.images;
    newVendorCompany.files = this.vendorCompany.files;

    this.showProgressBar = true;

    this.vendorCompanyService.createVendorCompany(newVendorCompany).subscribe(
      response => {
        console.log(response);
        this.showProgressBar = false;
        this.notify.show(response['data']);
      },
      err => {
        console.warn(err);
        this.showProgressBar = false;
      }
    );
  }
}





