import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { VendorCompany } from 'src/app/models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { VendorCompanyService } from 'src/app/services/vendorCompany/vendor-company.service';
import { Observable, forkJoin, Observer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import VendorProjectHelper from '../../services/helperServices/vendorProjectHelper';

@Component({
  selector: 'app-update-vendor-company',
  templateUrl: './update-vendor-company.component.html',
  styleUrls: ['./update-vendor-company.component.scss']
})
export class UpdateVendorCompanyComponent implements OnInit {
  vendorCompany: VendorCompany = this.vendorCompanyService.emptyVendorCompany;
  vendorCompanyForm: FormGroup;
  isLoaded = false;
  @ViewChild('avatar') avatarImg: ElementRef;
  projectId: string;
  VendorProjectHelper = VendorProjectHelper;

  newStep: string;
  newStepMinValid = true;
  newStepMaxValid = true;
  newStepNullValid = true;
  newStepBtnWasPressed = false;
  maxStepsCount = 15;
  minStepsCount = 3;

  avatarSize = 0;
  avatar: any; // avatar data

  filesEvent: Event;
  photosEvent: Event;

  constructor(
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private vendorCompanyService: VendorCompanyService,
    private activateRoute: ActivatedRoute
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
      employeesToHire: ['', Validators.required], // max 1000
      grossIncome: ['', Validators.required],
      averageCheck: ['', Validators.required],
      mounthlyClients: ['', Validators.required],
      averagePrice: ['', Validators.required],
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

  whenProjectIsLoaded() {
    this.isLoaded = true;
    this.setFormValues();
    this.avatarImg.nativeElement['src'] = this.vendorCompany.avatar;
  }

  ngOnInit() {
    // use when page reload
    // this.vendorCompanyService.fetchVendorCompanies().subscribe(
    //   (companies: VendorCompany[]) => {
    //     // for (let i = 0; i < companies.length; i++) {
    //     //   if (companies[i].id === this.projectId) {
    //     //     this.vendorCompany = companies[i];
    //     //     break;
    //     //   }
    //     // }
    //     this.vendorCompany = companies[0];
    //     this.whenProjectIsLoaded();
    //   },
    //   err => {
    //     console.warn(err);
    //   }
    // );

    // else if navigate from projects
    setTimeout(() => {
      this.vendorCompany = this.vendorCompanyService.projectForUpdate;
      this.whenProjectIsLoaded();
    }, 0);
    // this.vendorCompany = this.vendorCompanyService.projectForUpdate;
    // this.whenProjectIsLoaded();
  }

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
    const maxAvatarSize = 1024 * 1024 * 5;
    if (event.target.files == null || event.target.files.length === 0) {
      this.avatarImg.nativeElement['src'] = VendorProjectHelper.emptyAvatar;
      this.avatar = '';
      return;
    }

    this.avatarSize = event.target.files[0].size;
    if (this.avatarSize > maxAvatarSize) {
      this.vendorCompanyForm.controls['avatar'].setErrors({ 'maxAvatarSizeErr': true });
      this.avatarImg.nativeElement['src'] = VendorProjectHelper.emptyAvatar;
      this.avatar = '';
      return;
    }

    const avatarReader = new FileReader();
    avatarReader.onload = (avatar) => {
      this.avatarImg.nativeElement['src'] = avatar.target['result'];
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

  setFormValues(): void {
    const avatar = '';
    // const photos = '';
    // const files = '';
    // const videos = '';

    this.vendorCompanyForm.setValue({
      name: this.vendorCompany.name,
      avatar: avatar,
      legalEntityName: this.vendorCompany.legalEntityName,
      goal: this.vendorCompany.goal,
      region: this.vendorCompany.region,
      address: this.vendorCompany.address,
      fieldOfActivity: this.vendorCompany.fieldOfActivity,
      companyAge: this.vendorCompany.companyAge,
      employeesNumber: this.vendorCompany.employeesNumber,
      employeesToHire: this.vendorCompany.employeesToHire,
      grossIncome: this.vendorCompany.grossIncome,
      averageCheck: this.vendorCompany.averageCheck,
      mounthlyClients: this.vendorCompany.mounthlyClients,
      averagePrice: this.vendorCompany.averagePrice,
      description: this.vendorCompany.description,
      moneyRequired: this.vendorCompany.moneyRequired,
      investmentDescription: this.vendorCompany.investmentDescription,

      forSteps: '',

      // photos: photos,
      // videos: this.vendorCompany.videos,
      // files: files
    });

    this.vendorCompanyForm.controls['avatar'].setErrors(null);
  }

  onSubmit() {
    if (this.vendorCompanyForm.valid === false) {
      return;
    }

    const updatedVendorCompany: VendorCompany = {
      ...this.vendorCompanyForm.value,
    };

    updatedVendorCompany.avatar = this.avatar;
    updatedVendorCompany.steps = this.vendorCompany.steps;

    this.vendorCompanyService.updateVendorCompany(this.vendorCompany.id, updatedVendorCompany).subscribe(
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
