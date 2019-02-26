import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { VendorCompany } from 'src/app/models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { VendorCompanyService } from 'src/app/services/vendorCompany/vendor-company.service';
import { ActivatedRoute } from '@angular/router';
import VendorProjectHelper from '../../services/helperServices/vendorProjectHelper';
import { delay } from 'rxjs/operators';

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

  avatarSize = 0;
  maxAvatarSize = 1024 * 1024 * 5;
  avatarFormData: FormData = new FormData();
  showAvatarProgress = false;
  avatarIsTouched = false;

  photosIsUploaded = false;
  filesIsUploaded = true;

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
      region: ['', Validators.required],
      address: ['', Validators.required],
      fieldOfActivity: ['', Validators.required],
      companyAge: ['', Validators.required],
      employeesNumber: ['', Validators.required],
      employeesToHire: ['', Validators.required],
      grossIncome: ['', Validators.required],
      averageCheck: ['', Validators.required],
      mounthlyClients: ['', Validators.required],
      averagePrice: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1024)]],
      moneyRequired: ['', Validators.required],
      investmentDescription: ['', [Validators.required, Validators.maxLength(4096)]],
      forSteps: [''],
      forPhotos: [''],
      forFiles: [''],
    });
  }

  whenProjectIsLoaded() {
    this.isLoaded = true;
    this.setFormValues();
    this.avatarImg.nativeElement['src'] = this.vendorCompany.avatar;
  }

  getCompanyFromService() {
    if (this.vendorCompanyService.projectForUpdate == null) {
      return;
    }
    setTimeout(() => {
      this.vendorCompany = this.vendorCompanyService.projectForUpdate;
      this.whenProjectIsLoaded();
    }, 0);
  }

  getCompanyFromServer() {
    const arrLength: number = this.activateRoute.url['value'].length;
    this.projectId = this.activateRoute.url['value'][arrLength - 1].path;

    this.vendorCompanyService.fetchVendorCompanies().subscribe(
      (companies: VendorCompany[]) => {
        for (let i = 0; i < companies.length; i++) {
          if (companies[i].id === parseInt(this.projectId, 10)) {
            this.vendorCompany = companies[i];
            this.whenProjectIsLoaded();
            return;
          }
        }
      },
      err => {
        console.warn(err);
      }
    );
  }

  ngOnInit() {
    if (
      this.vendorCompanyService.projectForUpdate == null ||
      this.vendorCompanyService.projectForUpdate === this.vendorCompanyService.emptyVendorCompany
    ) {
      // use when page reload
      this.getCompanyFromServer();
    } else {
      // else if navigate from projects
      this.getCompanyFromService();
    }
  }

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
    this.avatarIsTouched = true;

    if (event.target.files == null || event.target.files.length === 0) {
      this.avatarImg.nativeElement['src'] = VendorProjectHelper.emptyAvatar;
      return;
    }

    this.avatarSize = event.target.files[0].size;
    if (this.avatarSize > this.maxAvatarSize) {
      this.vendorCompanyForm.controls['avatar'].setErrors({ 'maxAvatarSizeErr': true });
      this.avatarImg.nativeElement['src'] = VendorProjectHelper.emptyAvatar;
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

    this.vendorCompanyService.uploadAvatar(this.avatarFormData, this.vendorCompany.id)
      .subscribe(
        res => {
          console.log(res); // todo avatar = res
          this.vendorCompanyForm.controls['avatar'].setErrors(null);
          this.avatarFormData.delete('AVATAR');
          this.showAvatarProgressBar(false);
        },
        err => {
          console.warn(err);
          this.vendorCompanyForm.controls['avatar'].setErrors(null);
          this.avatarFormData.delete('AVATAR');
          this.showAvatarProgressBar(false);
        }
      );
  }

  setFormValues(): void {
    this.vendorCompanyForm.setValue({
      name: this.vendorCompany.name,
      avatar: '',
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
      forPhotos: '',
      forFiles: '',
    });

    this.vendorCompanyForm.controls['avatar'].setErrors(null);
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
    if (this.vendorCompanyForm.valid === false) {
      return;
    }

    const updatedVendorCompany: VendorCompany = {
      ...this.vendorCompanyForm.value,
    };

    updatedVendorCompany.steps = this.vendorCompany.steps;
    updatedVendorCompany.videos = this.vendorCompany.videos;

    this.vendorCompanyService.updateVendorCompany(this.vendorCompany.id, updatedVendorCompany)
      .subscribe(
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
