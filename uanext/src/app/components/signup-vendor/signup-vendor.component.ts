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
    private notify: NotificationService
  ) {
    this.signupForm = this.formBuilder.group({
      fullName: ['fullName1', Validators.required],
      email: ['qe@zxc.com', [Validators.required, Validators.email]],
      itn: ['12345', Validators.required],
      password: ['123456!@#', [Validators.required, Validators.minLength(6)]],
      rePassword: ['123456!@#', [Validators.required, matchOtherValidator('password')]],
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
        console.log(response); // TODO email already exist
        if (response.success === false) {
          this.notify.show(response.message);
        }
        if (response.status === 200) {
          this.router.navigate(['signin']);
        }
      },
      err => {
        console.warn(err);
      }
    );
  }

}
