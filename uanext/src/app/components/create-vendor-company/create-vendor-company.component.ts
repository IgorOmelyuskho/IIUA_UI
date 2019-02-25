import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VendorCompany } from 'src/app/models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { VendorCompanyService } from 'src/app/services/vendorCompany/vendor-company.service';

@Component({
  selector: 'app-create-vendor-company',
  templateUrl: './create-vendor-company.component.html',
  styleUrls: ['./create-vendor-company.component.scss']
})
export class CreateVendorCompanyComponent implements OnInit {
  vendorCompany: VendorCompany = this.vendorCompanyService.emptyVendorCompany;
  vendorCompanyForm: FormGroup;
  submitted = false;
  emptyAvatar = '../../../assets/img/empty-profile.jpg';
  @ViewChild('avatar2') avatarImg: ElementRef;

  avatarSize = 0;
  maxAvatarSize = 1024 * 1024 * 5;
  avatarFormData: FormData = new FormData();

  photosIsUploaded = false;
  filesIsUploaded = true;

  constructor(
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private vendorCompanyService: VendorCompanyService,
  ) {
    this.vendorCompanyForm = this.formBuilder.group({
      name: ['hgf', Validators.required],
      avatar: ['', Validators.required],
      legalEntityName: ['gfd', Validators.required],
      goal: ['gfdgfd', [Validators.required, Validators.minLength(2), Validators.maxLength(1024)]], // todo min - 200
      region: ['gfd', Validators.required],
      address: ['gfd', Validators.required],
      fieldOfActivity: ['gfdgd', Validators.required],
      companyAge: ['1', Validators.required],
      employeesNumber: ['1', Validators.required],
      employeesToHire: ['10', Validators.required],
      grossIncome: ['100', Validators.required],
      averageCheck: ['1000', Validators.required],
      mounthlyClients: ['100', Validators.required],
      averagePrice: ['100', Validators.required],
      description: ['dff', [Validators.required, Validators.maxLength(1024)]],
      moneyRequired: ['100000', Validators.required],
      investmentDescription: ['fdsfs', [Validators.required, Validators.maxLength(4096)]],

      forSteps: [''],
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
      return;
    }

    this.vendorCompany.videos = e;
  }

  handleAvatarSelect(event) {
    if (event.target.files == null || event.target.files.length === 0) {
      this.avatarImg.nativeElement['src'] = this.emptyAvatar;
      return;
    }

    this.avatarSize = event.target.files[0].size;
    if (this.avatarSize > this.maxAvatarSize) {
      this.vendorCompanyForm.controls['avatar'].setErrors({ 'maxAvatarSizeErr': true });
      this.avatarImg.nativeElement['src'] = this.emptyAvatar;
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

  uploadAvatar() {
    if (this.avatarFormData.getAll('AVATAR').length < 1) {
      return;
    }

    this.vendorCompanyService.uploadAvatar(this.avatarFormData, this.vendorCompany.id)
      .subscribe(
        res => {
          this.vendorCompanyForm.controls['avatar'].setErrors(null);
          console.log(res);
          this.avatarFormData.delete('AVATAR');
        },
        err => {
          this.vendorCompanyForm.controls['avatar'].setErrors(null); // todo
          console.log(err);
          this.avatarFormData.delete('AVATAR');
        }
      );
  }

  photosUploaded(event) {
    this.photosIsUploaded = event;
    if (event === true) {
      this.vendorCompanyForm.controls['forPhotos'].setErrors(null);
    } else {
      this.vendorCompanyForm.controls['forPhotos'].setErrors({ 'photosNotUploaded': true });
    }
  }

  filesUploaded(event) {
    this.filesIsUploaded = event;
    if (event === true) {
      this.vendorCompanyForm.controls['forFiles'].setErrors(null);
    } else {
      this.vendorCompanyForm.controls['forFiles'].setErrors({ 'filesNotUploaded': true });
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.vendorCompany.steps.length === 0) {
      this.vendorCompanyForm.controls['forSteps'].setErrors({ 'err': true });
    }
    if (this.filesIsUploaded === false) {
      this.vendorCompanyForm.controls['forFiles'].setErrors({ 'filesNotUploaded': true });
    }
    if (this.photosIsUploaded === false) {
      this.vendorCompanyForm.controls['forPhotos'].setErrors({ 'photosNotUploaded': true });
    }

    if (this.vendorCompanyForm.valid === false) {
      return;
    }

    const newVendorCompany: VendorCompany = {
      ...this.vendorCompanyForm.value,
    };

    newVendorCompany.steps = this.vendorCompany.steps;
    newVendorCompany.videos = this.vendorCompany.videos;

    this.vendorCompanyService.createVendorCompany(newVendorCompany).subscribe(
      response => {
        console.log(response);
        this.notify.show(response['data']);
      },
      err => {
        console.warn(err);
      }
    );
  }
}





