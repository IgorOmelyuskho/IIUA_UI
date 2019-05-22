import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import FormHelper from 'src/app/helperClasses/helperClass';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/http/notification.service';
import { matchOtherValidator } from 'src/app/validators/validators';

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
      projectId: ['', Validators.required],
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

    this.authService.signUpAsProjectUser(this.signupForm.value).subscribe(
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
