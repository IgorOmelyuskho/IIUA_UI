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

    // this.authService.sendEmail().subscribe(  //  this.authService.socialUserLogin
    //   val => {
    //     console.log(val);
    //     this.authService.needEmailForSocialLogin = false;
    //   },
    //   err => {
    //     console.warn(err);
    //   }
    // );
  }

}
