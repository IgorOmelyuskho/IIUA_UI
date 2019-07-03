import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import FormHelper from 'src/app/helperClasses/helperClass';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/http/notification.service';
import { matchOtherValidator } from 'src/app/validators/validators';
import { TranslateService } from 'src/app/services/translate.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router,
    private notify: NotificationService,
    private translate: TranslateService
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

  ngOnInit() { }

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
        console.log(response);
        this.showProgress = false;
        if (response.status === 200) {
          if (response.body == null) {
            this.notify.show(this.translate.data['ProjectUserSignupComponent'].checkEmail);
          } else {
            this.notify.show(response.body.data);
          }
        } else {
          this.notify.show(response.body.error);
        }
      },
      err => {
        console.warn(err);
        this.showProgress = false;
        this.notify.show(err.error.error.errorMessage[0]);
      }
    );
  }

}
