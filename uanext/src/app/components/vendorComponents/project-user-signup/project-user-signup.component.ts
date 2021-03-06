import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import FormHelper from 'src/app/helperClasses/helperClass';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
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
  @ViewChild('passwordInput') passwordInput: ElementRef;
  @ViewChild('togglePasswordImg') togglePasswordImg: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router,
    private notify: ToastService,
    private translate: TranslateService,
    private projectsService: ProjectsService
  ) {
    this.signupForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(FormHelper.emailPattern)]],
      // phone: ['', [Validators.required, Validators.pattern(FormHelper.phonePattern)]],
      projectId: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // rePassword: ['', [Validators.required, matchOtherValidator('password')]],
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

  togglePasswordVisible() {
    if (this.passwordInput.nativeElement.type === 'password') {
      this.passwordInput.nativeElement.type = 'text';
      this.togglePasswordImg.nativeElement.src = '../../../../assets/img/hide-password.png';
    } else {
      this.passwordInput.nativeElement.type = 'password';
      this.togglePasswordImg.nativeElement.src = '../../../../assets/img/show-password.png';
    }
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
