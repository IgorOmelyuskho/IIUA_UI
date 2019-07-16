import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { ActivatedRoute } from '@angular/router';
import FormHelper from '../../../helperClasses/helperClass';
import { VendorProject } from 'src/app/models/vendorProject';
import { ProjectsService } from 'src/app/services/http/projects.service';
import { FilesService } from 'src/app/services/http/files.service';
import { FieldActivityInterface, TranslateService } from 'src/app/services/translate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-vendor-project',
  templateUrl: './update-vendor-project.component.html',
  styleUrls: ['./update-vendor-project.component.scss']
})
export class UpdateVendorProjectComponent implements OnInit, OnDestroy {
  vendorProject: VendorProject = this.projectsService.emptyVendorProject;
  vendorProjectForm: FormGroup;
  isLoaded = false;
  showProgressBar = false;
  @ViewChild('avatara') avataraImg: ElementRef;
  projectId: string;
  FormHelper = FormHelper;
  self = 'UpdateVendorProjectComponent';
  fieldActivityOptions: FieldActivityInterface[];

  avataraSize = 0;
  maxAvataraSize = 1024 * 1024 * 5;
  avataraFormData: FormData = new FormData();
  showAvataraProgress = false;
  avataraIsTouched = false;

  minPhotosCount = 5;

  fieldActivityOptions_2: FieldActivityInterface[];
  fieldOfActivitySubscription: Subscription;
  regionOptions;
  regionSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private projectsService: ProjectsService,
    private activateRoute: ActivatedRoute,
    private filesService: FilesService,
    private translateService: TranslateService
  ) {
    this.vendorProjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      avatara: ['', Validators.required],
      legalEntityName: ['', Validators.required],
      goal: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(1024)]], // todo min - 200
      region: ['', Validators.required],
      address: ['', Validators.required],
      activities: ['', Validators.required],
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
    this.avataraImg.nativeElement['src'] = this.vendorProject.avatara.url;
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
    this.fieldOfActivitySubscription = this.translateService.fieldOfActivityOptions.subscribe(
      (val: FieldActivityInterface[]) => {
        this.fieldActivityOptions_2 = JSON.parse(JSON.stringify(val));
      }
    );

    this.regionSubscription = this.translateService.region.subscribe(
      val => {
        this.regionOptions = JSON.parse(JSON.stringify(val));
      }
    );

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

  handleAvataraSelect(event) {
    this.avataraIsTouched = true;

    if (event.target.files == null || event.target.files.length === 0) {
      this.avataraImg.nativeElement['src'] = this.FormHelper.emptyAvatara;
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
          this.vendorProject.avatara = res[0];
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

  setFormValues(): void {
    this.vendorProjectForm.setValue({
      name: this.vendorProject.name,
      avatara: '',
      legalEntityName: this.vendorProject.legalEntityName,
      goal: this.vendorProject.goal,
      region: this.vendorProject.region,
      address: this.vendorProject.address,
      activities: this.vendorProject.activities,
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

    this.vendorProjectForm.controls['avatara'].setErrors(null);
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
    updatedVendorCompany.avatara = this.vendorProject.avatara;
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

  ngOnDestroy() {
    this.fieldOfActivitySubscription.unsubscribe();
    this.regionSubscription.unsubscribe();
  }
}
