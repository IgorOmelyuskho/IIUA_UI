import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/services/http/notification.service';
import FormHelper from '../../../helperClasses/helperClass';
import { VendorProject } from 'src/app/models/vendorProject';
import { ProjectsService } from 'src/app/services/http/projects.service';

@Component({
  selector: 'app-create-vendor-project',
  templateUrl: './create-vendor-project.component.html',
  styleUrls: ['./create-vendor-project.component.scss']
})
export class CreateVendorProjectComponent implements OnInit {
  vendorProject: VendorProject = this.projectsService.emptyVendorProject;
  vendorProjectForm: FormGroup;
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
    private projectsService: ProjectsService,
  ) {
    this.vendorProjectForm = this.formBuilder.group({
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

  ngOnInit() {
    this.vendorProject.images = [];
    this.vendorProject.files = [];
   }

  get formControls() {
    return this.vendorProjectForm.controls;
  }

  stepsEventHandler(e) {
    if (e.error) {
      this.vendorProjectForm.controls['forSteps'].setErrors({ 'err': true });
      return;
    }

    this.vendorProject.steps = e;
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

  handleAvatarSelect(event) {
    this.avatarIsTouched = true;

    if (event.target.files == null || event.target.files.length === 0) {
      this.avatarImg.nativeElement['src'] = this.FormHelper.emptyAvatar;
      this.avatarFormData.delete('AVATAR');
      return;
    }

    this.avatarSize = event.target.files[0].size;
    if (this.avatarSize > this.maxAvatarSize) {
      this.vendorProjectForm.controls['avatar'].setErrors({ 'maxAvatarSizeErr': true });
      this.avatarImg.nativeElement['src'] = this.FormHelper.emptyAvatar;
      return;
    }

    this.vendorProjectForm.controls['avatar'].setErrors({ 'avatarNotUploaded': true });

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

    this.projectsService.uploadImages(this.avatarFormData)
      .subscribe(
        res => {
          this.avatarData = res[0];
          this.vendorProjectForm.controls['avatar'].setErrors(null);
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

  filesUploaded(event) {
    if (event.error === false) {
      const filesData: any[] = event.files;
      for (let i = 0; i < filesData.length; i++) {
        this.vendorProject.files.push(filesData[i]);
      }
    }
  }

  removeFileItem(event) {
    for (let i = 0; i < this.vendorProject.files.length; i++) {
      if (this.vendorProject.files[i] === event) {
        this.vendorProject.files.splice(i, 1);
      }
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.vendorProject.steps.length === 0) {
      this.vendorProjectForm.controls['forSteps'].setErrors({ 'err': true });
    }
    if (this.vendorProject.videos.length === 0) {
      this.vendorProjectForm.controls['forVideos'].setErrors({ 'err': true });
    }
    if (this.vendorProject.images.length < this.minPhotosCount) {
      this.vendorProjectForm.controls['forPhotos'].setErrors({ 'err': true });
    }

    if (this.vendorProjectForm.valid === false) {
      return;
    }

    const newVendorProject: VendorProject = {
      ...this.vendorProjectForm.value,
    };

    newVendorProject.steps = this.vendorProject.steps;
    newVendorProject.videos = this.vendorProject.videos;
    newVendorProject.avatara = this.avatarData;
    newVendorProject.images = this.vendorProject.images;
    newVendorProject.files = this.vendorProject.files;

    this.showProgressBar = true;

    this.projectsService.createVendorProject(newVendorProject).subscribe(
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




