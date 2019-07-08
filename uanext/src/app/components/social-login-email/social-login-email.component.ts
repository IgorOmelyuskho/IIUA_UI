import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import FormHelper from 'src/app/helperClasses/helperClass';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { Router } from '@angular/router';
import { MethodWhenEmailIsEmpty } from 'src/app/models/socialMethodName';
import { SocialUser } from 'angularx-social-login';
import { SocialUserDto } from 'src/app/models/socialUserDto';

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
    private router: Router,
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


  onSubmit() {
    this.submitted = true;

    if (this.emailForm.invalid) {
      return;
    }

    if (this.authService.methodWhenEmailIsEmpty === MethodWhenEmailIsEmpty.socialUserLogin) {
      this.authService.signInWithFB(); // userRole in this.authService.userRoleForRegister, maybe LinkedIn too not have email
    }

    if (this.authService.methodWhenEmailIsEmpty === MethodWhenEmailIsEmpty.socialRegisterInvestor) {
      this.authService.signUpWithFB(); // userRole in this.authService.userRoleForRegister, maybe LinkedIn too not have email
    }

    if (this.authService.methodWhenEmailIsEmpty === MethodWhenEmailIsEmpty.socialRegisterVendor) {
      this.authService.signUpWithFB(); // userRole in this.authService.userRoleForRegister, maybe LinkedIn too not have email
    }
  }

}
