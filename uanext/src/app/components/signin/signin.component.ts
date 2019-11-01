import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AuthorizationService } from '../../services/http/authorization.service';
import { StateService } from '../../services/state.service';
import { ProfileService } from 'src/app/services/http/profile.service';
import { Observable } from 'rxjs';
import { VendorRole, InvestorRole, AdminRole, UserRole } from 'src/app/models';
import { ToastService } from 'src/app/services/toast.service';
import FormHelper from '../../helperClasses/helperClass';
import { take, first, delay } from 'rxjs/operators';
import { ProjectUserRole } from 'src/app/models/projectUserRole';
import { AuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUserDto } from 'src/app/models/socialUserDto';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;
  FormHelper = FormHelper;
  showProgressBar = false;
  self = 'SigninComponent';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router,
    private stateService: StateService,
    private profileService: ProfileService,
    private notify: ToastService,
    private socialAuthService: AuthService,
    private translate: TranslateService
  ) {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(FormHelper.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() { }

  get formControls() {
    return this.signinForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signinForm.invalid) {
      return;
    }

    this.showProgressBar = true;

    this.authService.signIn(this.signinForm.value).subscribe(
      response => {
        this.showProgressBar = false;
        this.authService.successSocialOrEmailLogin(response.body.token);
      },
      err => {
        console.warn(err);
        this.showProgressBar = false;
      }
    );
  }

  signInWithGoogle(): void {
    this.authService.signInWithGoogle();
  }

  signInWithFB(): void {
    this.authService.signInWithFB();
  }

}
