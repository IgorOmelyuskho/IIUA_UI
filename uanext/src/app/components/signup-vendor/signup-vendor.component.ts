import { HelperService } from './../../services/helperServices/helper.service';
import { Router } from '@angular/router';
import { AuthorizationService } from './../../services/auth/authorization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { matchOtherValidator } from '../../validators/validators';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-signup-vendor',
  templateUrl: './signup-vendor.component.html',
  styleUrls: ['./signup-vendor.component.scss']
})
export class SignupVendorComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router,
    private notify: NotificationService,
    private helperService: HelperService // required for html
  ) {
    this.signupForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.helperService.emailPattern)]],
      itn: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(this.helperService.phonePattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, matchOtherValidator('password')]],
    });
  }

  ngOnInit() {
  }

  get formControls() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.authService.signUpAsVendor(this.signupForm.value).subscribe(
      response => {
        console.log(response);
        if (response.body.isSuccess === true && response.status === 200) {
          this.notify.show(response.body.data);
          this.router.navigate(['signin']);
        } else {
          this.notify.show(response.body.error);
        }
      },
      err => {
        console.warn(err);
        this.notify.show(err.error.error.errorMessage);
      }
    );
  }

}
