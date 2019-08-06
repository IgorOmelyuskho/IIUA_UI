import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import FormHelper from 'src/app/helperClasses/helperClass';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { matchOtherValidator } from 'src/app/validators/validators';
import { TranslateService } from 'src/app/services/translate.service';
import { ProjectsService } from 'src/app/services/http/projects.service';
import { VendorProject } from 'src/app/models/vendorProject';

@Component({
  selector: 'app-project-user-signup',
  templateUrl: './project-user-signup.component.html',
  styleUrls: ['./project-user-signup.component.scss']
})
export class ProjectUserSignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  FormHelper = FormHelper;
  showProgress = false;
  self = 'ProjectUserSignupComponent';
  projects: VendorProject[];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router,
    private notify: NotificationService,
    private translate: TranslateService,
    private projectsService: ProjectsService
  ) {
    this.signupForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(FormHelper.emailPattern)]],
      phone: ['', [Validators.required, Validators.pattern(FormHelper.phonePattern)]],
      projectId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, matchOtherValidator('password')]],
    });
  }

  ngOnInit() {
    this.projectsService.fetchVendorProjects().subscribe(
      (val: VendorProject[]) => {
        this.projects = val;
      },
      err => {
        console.warn(err);
      }
    );
  }

  get formControls() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.showProgress = true;
    this.authService.signUpAsProjectUser(this.signupForm.value).subscribe(
      response => {
        this.showProgress = false;
        this.notify.show(this.translate.data['ProjectUserSignupComponent'].projectUserCreated);
      },
      err => {
        console.warn(err);
        this.showProgress = false;
      }
    );
  }

}
