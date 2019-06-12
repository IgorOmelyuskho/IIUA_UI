import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/services/http/notification.service';
import { ActivatedRoute } from '@angular/router';
import FormHelper from '../../../helperClasses/helperClass';
import { VendorProject } from 'src/app/models/vendorProject';
import { ProjectsService } from 'src/app/services/http/projects.service';
import { FilesService } from 'src/app/services/http/files.service';

@Component({
  selector: 'app-update-vendor-project',
  templateUrl: './update-vendor-project.component.html',
  styleUrls: ['./update-vendor-project.component.scss']
})
export class UpdateVendorProjectComponent implements OnInit {
  vendorProject: VendorProject = this.projectsService.emptyVendorProject;
  vendorProjectForm: FormGroup;
  isLoaded = false;
  showProgressBar = false;
  @ViewChild('avatar') avatarImg: ElementRef;
  projectId: string;
  FormHelper = FormHelper;

  avatarSize = 0;
  maxAvatarSize = 1024 * 1024 * 5;
  avatarFormData: FormData = new FormData();
  showAvatarProgress = false;
  avatarIsTouched = false;

  minPhotosCount = 5;

  constructor(
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private projectsService: ProjectsService,
    private activateRoute: ActivatedRoute,
    private filesService: FilesService
  ) {
    this.vendorProjectForm = this.formBuilder.group({
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
      forVideos: [''],
      forPhotos: [''],
      forFiles: [''],
    });
  }

  whenProjectIsLoaded() {
    this.isLoaded = true;
    this.setFormValues();
    this.avatarImg.nativeElement['src'] = this.vendorProject.avatar.url;
  }

  getCompanyFromService() {
    if (this.projectsService.projectForUpdate == null) {
      return;
    }
    setTimeout(() => {
      this.vendorProject = this.projectsService.projectForUpdate;
      this.whenProjectIsLoaded();
    }, 0);
  }

  getCompanyFromServer() {
    const arrLength: number = this.activateRoute.url['value'].length;
    this.projectId = this.activateRoute.url['value'][arrLength - 1].path;

    this.projectsService.fetchVendorProjects().subscribe(
      (companies: VendorProject[]) => {
        for (let i = 0; i < companies.length; i++) {
          if (companies[i].id === this.projectId) {
            this.vendorProject = companies[i];
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
      this.projectsService.projectForUpdate == null ||
      this.projectsService.projectForUpdate === this.projectsService.emptyVendorProject
    ) {
      // use when page reload
      this.getCompanyFromServer();
    } else {
      // else if navigate from projects
      this.getCompanyFromService();
    }
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

    this.filesService.uploadFiles(this.avatarFormData)
      .subscribe(
        res => {
          this.vendorProject.avatar = res[0];
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

  setFormValues(): void {
    this.vendorProjectForm.setValue({
      name: this.vendorProject.name,
      avatar: '',
      legalEntityName: this.vendorProject.legalEntityName,
      goal: this.vendorProject.goal,
      region: this.vendorProject.region,
      address: this.vendorProject.address,
      fieldOfActivity: this.vendorProject.fieldOfActivity,
      companyAge: this.vendorProject.companyAge,
      employeesNumber: this.vendorProject.employeesNumber,
      employeesToHire: this.vendorProject.employeesToHire,
      grossIncome: this.vendorProject.grossIncome,
      averageCheck: this.vendorProject.averageCheck,
      mounthlyClients: this.vendorProject.mounthlyClients,
      averagePrice: this.vendorProject.averagePrice,
      description: this.vendorProject.description,
      moneyRequired: this.vendorProject.moneyRequired,
      investmentDescription: this.vendorProject.investmentDescription,
      forSteps: '',
      forVideos: '',
      forPhotos: '',
      forFiles: '',
    });

    this.vendorProjectForm.controls['avatar'].setErrors(null);
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
    if (this.vendorProjectForm.valid === false) {
      return;
    }

    const updatedVendorCompany: VendorProject = {
      ...this.vendorProjectForm.value,
    };

    updatedVendorCompany.steps = this.vendorProject.steps;
    updatedVendorCompany.videos = this.vendorProject.videos;
    updatedVendorCompany.avatara = this.vendorProject.avatar;
    updatedVendorCompany.images = this.vendorProject.images;
    updatedVendorCompany.files = this.vendorProject.files;

    this.showProgressBar = true;

    this.projectsService.updateVendorProject(this.vendorProject.id, updatedVendorCompany)
      .subscribe(
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
