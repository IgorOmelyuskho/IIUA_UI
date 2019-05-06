import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import FormHelper from '../../services/helperServices/formHelper';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { matchOtherValidator } from '../../validators/validators';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.scss']
})
export class AdminSignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  FormHelper = FormHelper;
  showProgress = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router,
    private notify: NotificationService
  ) {
    this.signupForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(FormHelper.emailPattern)]],
      phone: ['', [Validators.required, Validators.pattern(FormHelper.phonePattern)]],
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

    this.showProgress = true;

    this.authService.signUpAsAdmin(this.signupForm.value).subscribe(
      response => {
        this.showProgress = false;
        if (response.body.isSuccess === true && response.status === 200) {
          this.notify.show(response.body.data);
          this.router.navigate(['signin']);
        } else {
          this.notify.show(response.body.error);
        }
      },
      err => {
        console.warn(err);
        this.showProgress = false;
        this.notify.show(err.error.error.errorMessage);
      }
    );
  }
}