import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import FormHelper from 'src/app/helperClasses/helperClass';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-login-email',
  templateUrl: './social-login-email.component.html',
  styleUrls: ['./social-login-email.component.scss']
})
export class SocialLoginEmailComponent implements OnInit {
  emailForm: FormGroup;
  submitted = false;
  FormHelper = FormHelper;
  self = 'SocialLoginEmailComponent';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(FormHelper.emailPattern)]],
    });
  }

  ngOnInit() {
  }

  get formControls() {
    return this.emailForm.controls;
  }

  close() {
    this.authService.needEmailForSocialLogin = false;
  }

  onSubmit() {
    this.submitted = true;

    if (this.emailForm.invalid) {
      return;
    }

    // userRole in this.authService.userRoleForRegister, maybe LinkedIn too not have email
    this.authService.signUpWithFB(this.emailForm.value.email);
  }
}
