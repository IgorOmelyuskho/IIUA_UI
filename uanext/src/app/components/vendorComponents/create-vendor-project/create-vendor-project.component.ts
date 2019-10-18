import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import FormHelper from '../../../helperClasses/helperClass';
import { VendorProject } from 'src/app/models/vendorProject';
import { ProjectsService } from 'src/app/services/http/projects.service';
import { FilesService } from 'src/app/services/http/files.service';
import { FieldActivityInterface, TranslateService } from 'src/app/services/translate.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-vendor-project',
  templateUrl: './create-vendor-project.component.html',
  styleUrls: ['./create-vendor-project.component.scss']
})
export class CreateVendorProjectComponent implements OnInit, OnDestroy {
  vendorProject: VendorProject = this.projectsService.emptyVendorProject;
  vendorProjectForm: FormGroup;
  submitted = false;
  showProgressBar = false;
  @ViewChild('avatara2') avataraImg: ElementRef;
  FormHelper = FormHelper;
  self = 'CreateVendorProjectComponent';

  avataraSize = 0;
  maxAvataraSize = 1024 * 1024 * 5;
  avataraFormData: FormData = new FormData();
  showAvataraProgress = false;
  avataraIsTouched = false;
  avataraData: any;

  minPhotosCount = 1;

  fieldActivityOptions: FieldActivityInterface[];
  fieldOfActivitySubscription: Subscription;
  regionOptions;
  regionSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private projectsService: ProjectsService,
    private filesService: FilesService,
    private translateService: TranslateService,
    private router: Router
  ) {
    this.vendorProjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      avatara: ['', Validators.required],
      legalEntityName: ['', Validators.required],
      // goal: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1024)]], // todo min - 200
      region: ['', Validators.required],
      address: ['', Validators.required],
      // sphereActivities: ['', Validators.required],
      // companyAge: ['', Validators.required],
      // employeesNumber: ['', Validators.required],
      // employeesToHire: ['', Validators.required],
      // grossIncome: ['', Validators.required],
      // averageCheck: ['', Validators.required],
      // mounthlyClients: ['', Validators.required],
      // averagePrice: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1024)]],
      // moneyRequired: ['', Validators.required],
      // investmentDescription: ['', [Validators.required, Validators.maxLength(4096)]],
      forSteps: [''],
      forVideos: [''],
      forPhotos: [''],
      forFiles: [''],
      phone: ['', [Validators.pattern(FormHelper.phonePattern)]],
      skype: [''],
      telegram: [''],
      viber: [''],
      instagram: [''],
    });
  }

  ngOnInit() {
    this.fieldOfActivitySubscription = this.translateService.fieldOfActivityOptions.subscribe(
      (val: FieldActivityInterface[]) => {
        this.fieldActivityOptions = JSON.parse(JSON.stringify(val));
      }
    );

    this.regionSubscription = this.translateService.region.subscribe(
      val => {
        this.regionOptions = JSON.parse(JSON.stringify(val));
      }
    );

    this.vendorProject.images = [];
    // this.vendorProject.files = [];
  }

  get formControls() {
    return this.vendorProjectForm.controls;
  }

  stepsEventHandler(e) {
    if (e.error) {
      this.vendorProjectForm.controls['forSteps'].setErrors({ 'err': true });
      return;
    }

    // this.vendorProject.steps = e;
    this.vendorProjectForm.controls['forSteps'].setErrors(null);
  }

  videosEventHandler(e) {
    if (e.error) {
      this.vendorProjectForm.controls['forVideos'].setErrors({ 'err': true });
      return;
    }

    this.vendorProject.videos = e;
    this.vendorProjectForm.controls['forVideos'].setErrors(null);
  }

  handleAvataraSelect(event) {
    this.avataraIsTouched = true;

    if (event.target.files == null || event.target.files.length === 0) {
      this.avataraImg.nativeElement['src'] = this.FormHelper.emptyAvatara;
      this.avataraFormData.delete('AVATAR');
      return;
    }

    this.avataraSize = event.target.files[0].size;
    if (this.avataraSize > this.maxAvataraSize) {
      this.vendorProjectForm.controls['avatara'].setErrors({ 'maxAvataraSizeErr': true });
      this.avataraImg.nativeElement['src'] = this.FormHelper.emptyAvatara;
      return;
    }

    this.vendorProjectForm.controls['avatara'].setErrors({ 'avataraNotUploaded': true });

    // for show avatara miniature
    const avataraReader = new FileReader();
    avataraReader.onload = (avatara) => {
      this.avataraImg.nativeElement['src'] = avatara.target['result'];
    };
    avataraReader.readAsDataURL(event.target['files'][0]);
    // ....................... //

    const avataraFile = event.target['files'][0];
    this.avataraFormData.append('AVATAR', avataraFile, avataraFile.name);

    this.uploadAvatara();
  }

  showAvataraProgressBar(show: boolean) {
    if (show === true) {
      this.showAvataraProgress = true;
    } else {
      this.showAvataraProgress = false;
    }
  }

  uploadAvatara() {
    this.avataraIsTouched = true;

    if (this.avataraFormData.getAll('AVATAR').length < 1) {
      return;
    }

    this.showAvataraProgressBar(true);

    this.filesService.uploadFiles(this.avataraFormData)
      .subscribe(
        res => {
          this.avataraData = res[0];
          this.vendorProjectForm.controls['avatara'].setErrors(null);
          this.avataraFormData.delete('AVATAR');
          this.showAvataraProgressBar(false);
        },
        err => {
          console.warn(err);
          this.avataraFormData.delete('AVATAR');
          this.showAvataraProgressBar(false);
        }
      );
  }

  photosUploaded(event) {
    if (event.error === false) {
      const photosData: any[] = event.files;
      for (let i = 0; i < photosData.length; i++) {
        this.vendorProject.images.push(photosData[i]);
      }
    }

    if (event.error === false && this.vendorProject.images.length >= this.minPhotosCount) {
      this.vendorProjectForm.controls['forPhotos'].setErrors(null);
    } else {
      this.vendorProjectForm.controls['forPhotos'].setErrors({ 'err': true });
    }
  }

  removePhotoItem(event) {
    for (let i = 0; i < this.vendorProject.images.length; i++) {
      if (this.vendorProject.images[i] === event) {
        this.vendorProject.images.splice(i, 1);
      }
    }

    if (this.vendorProject.images.length < this.minPhotosCount) {
      this.vendorProjectForm.controls['forPhotos'].setErrors({ 'err': true });
    }
  }

  // filesUploaded(event) {
  //   if (event.error === false) {
  //     const filesData: any[] = event.files;
  //     for (let i = 0; i < filesData.length; i++) {
  //       this.vendorProject.files.push(filesData[i]);
  //     }
  //   }
  // }

  // removeFileItem(event) {
  //   for (let i = 0; i < this.vendorProject.files.length; i++) {
  //     if (this.vendorProject.files[i] === event) {
  //       this.vendorProject.files.splice(i, 1);
  //     }
  //   }
  // }

  onSubmit() {
    this.submitted = true;

    // if (this.vendorProject.steps.length === 0) {
    //   this.vendorProjectForm.controls['forSteps'].setErrors({ 'err': true });
    // }
    // if (this.vendorProject.videos.length === 0) {
    //   this.vendorProjectForm.controls['forVideos'].setErrors({ 'err': true });
    // }
    if (this.vendorProject.images.length < this.minPhotosCount) {
      this.vendorProjectForm.controls['forPhotos'].setErrors({ 'err': true });
    }

    if (this.vendorProjectForm.valid === false) {
      this.notify.show(this.translateService.data.checkEnteredData);
      return;
    }

    const newVendorProject: VendorProject = {
      ...this.vendorProjectForm.value,
    };

    // newVendorProject.steps = this.vendorProject.steps;
    newVendorProject.videos = this.vendorProject.videos;
    newVendorProject.images = [...this.vendorProject.images];
    const avatara = {
      ...this.avataraData,
      isAvatara: true
    };
    newVendorProject.images.push(avatara);
    // newVendorProject.files = this.vendorProject.files;
    // for (let i = 0; i < newVendorProject.sphereActivities.length; i++) {
    //   newVendorProject.sphereActivities[i] = {
    //     id: newVendorProject.sphereActivities[i],
    //   };
    // }
    // newVendorProject.employeesNumberMin = this.vendorProjectForm.value.employeesNumber.split('-')[0];
    // newVendorProject.employeesNumberMax = this.vendorProjectForm.value.employeesNumber.split('-')[1];

    this.showProgressBar = true;
    this.projectsService.createVendorProject(newVendorProject).subscribe(
      response => {
        this.showProgressBar = false;
        this.notify.show(this.translateService.data.projectSuccessfullyCreated);
        this.router.navigateByUrl('home/vendor/projects');
      },
      err => {
        console.warn(err);
        this.showProgressBar = false;
        this.notify.show(this.translateService.data.projectNotCreated);
        this.router.navigateByUrl('home/vendor/projects');
      }
    );
  }

  ngOnDestroy() {
    this.fieldOfActivitySubscription.unsubscribe();
    this.regionSubscription.unsubscribe();
  }
}





