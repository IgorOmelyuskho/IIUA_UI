import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VendorCompany } from 'src/app/models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { VendorCompanyService } from 'src/app/services/vendorCompany/vendor-company.service';
import { Observable, forkJoin, Observer } from 'rxjs';

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

  newStep: string;
  newStepMinValid = true;
  newStepMaxValid = true;
  newStepNullValid = true;
  newStepBtnWasPressed = false;
  maxStepsCount = 15;
  minStepsCount = 3;

  avatarSize = 0;
  maxAvatarSize = 1024 * 1024 * 5;
  avatar: any; // avatar data

  photosIsUploaded = false;
  // photosIsValid = false;

  filesIsUploaded = true;
  // filesIsValid = true;

  constructor(
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private vendorCompanyService: VendorCompanyService,
  ) {
    this.vendorCompanyForm = this.formBuilder.group({
      name: ['gfdgd', Validators.required],
      avatar: ['', Validators.required],
      legalEntityName: ['hfghgf', Validators.required],
      goal: ['hgfhf', [Validators.required, Validators.minLength(2), Validators.maxLength(1024)]], // todo min - 200
      region: ['', Validators.required],
      address: ['', Validators.required],
      fieldOfActivity: ['jghfjhg', Validators.required],
      companyAge: ['1', Validators.required], // todo min - 0 max - 100
      employeesNumber: ['101', Validators.required],
      employeesToHire: ['100', Validators.required], // max 1000
      grossIncome: ['100', Validators.required],
      averageCheck: ['123', Validators.required],
      mounthlyClients: ['101', Validators.required],
      averagePrice: ['123', Validators.required],
      description: ['hjghg', [Validators.required, Validators.maxLength(1024)]],
      moneyRequired: ['10000', Validators.required], // max 1000 0000 000
      investmentDescription: ['gfdhf', [Validators.required, Validators.maxLength(4096)]],

      forSteps: [''],
      forPhotos: [''],
      forFiles: [''],

      // NACE: ['NACE', Validators.required],
      // turnoverPerMonth: ['100 $', Validators.required],
      // averageUnitCost: ['50 $'],
    });
  }

  ngOnInit() { }

  get formControls() {
    return this.vendorCompanyForm.controls;
  }

  removeStepsItem(step) {
    for (let i = 0; i < this.vendorCompany.steps.length; i++) {
      if (this.vendorCompany.steps[i] === step) {
        this.vendorCompany.steps.splice(i, 1);

        const length = this.vendorCompany.steps.length;
        if (length <= this.maxStepsCount && length >= this.minStepsCount) {
          this.vendorCompanyForm.controls['forSteps'].setErrors(null);
        }
        if (length < this.minStepsCount) {
          this.vendorCompanyForm.controls['forSteps'].setErrors({ 'minCount': true });
        }

        return;
      }
    }
  }

  checkNewStep(): boolean {
    if (this.newStep == null || this.newStep === '') {
      this.newStepNullValid = false;
      this.newStepMinValid = true;
      this.newStepMaxValid = true;
      return false;
    } else {
      this.newStepNullValid = true;
    }

    const minLength = 3;
    const maxLength = 255;

    if (this.newStep.length < minLength) {
      this.newStepMinValid = false;
    } else {
      this.newStepMinValid = true;
    }

    if (this.newStep.length > maxLength) {
      this.newStepMaxValid = false;
    } else {
      this.newStepMaxValid = true;
    }

    if (this.newStepMinValid === false || this.newStepMaxValid === false) {
      return false;
    }

    return true;
  }

  newStepOnInput() {
    if (this.newStepBtnWasPressed === false) {
      return;
    }

    this.checkNewStep();
  }

  addNewStepClick() {
    this.newStepBtnWasPressed = true;

    const length = this.vendorCompany.steps.length;
    if (length < this.maxStepsCount && length >= this.minStepsCount - 1) {
      this.vendorCompanyForm.controls['forSteps'].setErrors(null);
    }
    if (length >= this.maxStepsCount + 1) {
      this.vendorCompanyForm.controls['forSteps'].setErrors({ 'maxCount': true });
      return;
    }

    const isValid = this.checkNewStep();
    if (isValid) {
      this.vendorCompany.steps.push({ data: this.newStep });
    }
  }

  handleAvatarSelect(event) {
    if (event.target.files == null || event.target.files.length === 0) {
      this.avatarImg.nativeElement['src']  = this.emptyAvatar;
      this.avatar = 'null';
      return;
    }

    this.avatarSize = event.target.files[0].size;
    if (this.avatarSize > this.maxAvatarSize) {
      this.vendorCompanyForm.controls['avatar'].setErrors({ 'maxAvatarSizeErr': true });
      this.avatarImg.nativeElement['src']  = this.emptyAvatar;
      this.avatar = 'null';
      return;
    }

    const avatarReader = new FileReader();
    avatarReader.onload = (avatar) => {
      this.avatarImg.nativeElement['src']  = avatar.target['result'];
      this.avatar = avatar.target['result'];
    };

    avatarReader.readAsDataURL(event.target['files'][0]);
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
      this.vendorCompanyForm.controls['forSteps'].setErrors({ 'minCount': true });
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

    newVendorCompany.avatar = this.avatar;
    newVendorCompany.steps = this.vendorCompany.steps;

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


  formStatus() {
    console.log(this.vendorCompanyForm);
  }
}





