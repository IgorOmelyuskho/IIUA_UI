import { Component, OnInit } from '@angular/core';
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

  newStep: string;
  newStepMin = true;
  newStepMax = true;
  newStepNull = true;
  newStepBtnWasPressed = false;
  maxStepsCount = 15;
  minStepsCount = 3;

  avatarSize = 0;
  maxAvatarSize = 1024 * 1024 * 5;
  avatar: any; // avatar data

  filesEvent: Event; // todo remove
  photosEvent: Event; // todo remove

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
      region: [''],
      address: [''],
      fieldOfActivity: ['', Validators.required],
      companyAge: ['', Validators.required], // todo min - 0 max - 100
      employeesNumber: ['', Validators.required],
      employeesToHire: [''], // max 1000
      grossIncome: ['', Validators.required],
      averageCheck: [''],
      mounthlyClients: ['', Validators.required],
      averagePrice: [''],
      description: ['', [Validators.required, Validators.maxLength(1024)]],
      moneyRequired: ['', Validators.required], // max 1000 0000 000
      investmentDescription: ['', [Validators.required, Validators.maxLength(4096)]],

      forSteps: [''],

      // NACE: ['NACE', Validators.required],
      // turnoverPerMonth: ['100 $', Validators.required],
      // averageUnitCost: ['50 $'],

      // photos: ['', Validators.required], // min 5 max 100
      // videos: [''], // max 10
      // files: [''],
    });
  }

  ngOnInit() { }

  get formControls() {
    return this.vendorCompanyForm.controls;
  }

  removeStepsItem(id) {
    for (let i = 0; i < this.vendorCompany.steps.length; i++) {
      if (this.vendorCompany.steps[i].id === id) {
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
      this.newStepNull = false;
      this.newStepMin = true;
      this.newStepMax = true;
      return false;
    } else {
      this.newStepNull = true;
    }

    const minLength = 3;
    const maxLength = 255;

    if (this.newStep.length < minLength) {
      this.newStepMin = false;
    } else {
      this.newStepMin = true;
    }

    if (this.newStep.length > maxLength) {
      this.newStepMax = false;
    } else {
      this.newStepMax = true;
    }

    if (this.newStepMin === false || this.newStepMax === false) {
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
      this.vendorCompany.steps.push({ id: Math.floor(Math.random() * 1000000), data: this.newStep });
    }
  }

  handleAvatarSelect(event) {
    const avatarImg = document.getElementById('avatar-image');

    if (event.target.files == null || event.target.files.length === 0) {
      avatarImg['src']  = this.emptyAvatar;
      this.avatar = 'null';
      return;
    }

    this.avatarSize = event.target.files[0].size;
    if (this.avatarSize > this.maxAvatarSize) {
      this.vendorCompanyForm.controls['avatar'].setErrors({ 'maxAvatarSizeErr': true });
      avatarImg['src']  = this.emptyAvatar;
      this.avatar = 'null';
      return;
    }

    const avatarReader = new FileReader();
    avatarReader.onload = (avatar) => {
      avatarImg['src']  = avatar.target['result'];
      this.avatar = avatar.target['result'];
    };

    avatarReader.readAsDataURL(event.target['files'][0]);
  }

  handlePhotosSelect(event) {
    this.photosEvent = event;
  }

  handleFilesSelect(event) {
    this.filesEvent = event;
  }

  onSubmit() {
    this.submitted = true;

    if (this.vendorCompany.steps.length === 0) {
      this.vendorCompanyForm.controls['forSteps'].setErrors({ 'minCount': true });
    }

    if (this.vendorCompanyForm.valid === false) {
      return;
    }

    // const id = this.stateService.userId();
    // if (id == null) {
    //   return;
    // }
    const id = '150'; // todo vendorRole id

    const newVendorCompany: VendorCompany = {
      ...this.vendorCompanyForm.value,
    };

    newVendorCompany.avatar = this.avatar;

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
