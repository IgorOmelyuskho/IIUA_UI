import { HelperService } from './../../services/helperServices/helper.service';
import { Router } from '@angular/router';
import { AuthorizationService } from './../../services/auth/authorization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { matchOtherValidator } from '../../validators/validators';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-signup-investor',
  templateUrl: './signup-investor.component.html',
  styleUrls: ['./signup-investor.component.scss']
})
export class SignupInvestorComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router,
    private notify: NotificationService,
    private helperService: HelperService // required
  ) {
    this.signupForm = this.formBuilder.group({
      fullName: ['fullName', Validators.required],
      email: ['string@g.com', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(this.helperService.phonePattern)]],
      password: ['string123', [Validators.required, Validators.minLength(6)]],
      rePassword: ['string123', [Validators.required, matchOtherValidator('password')]],
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

    this.authService.signUpAsInvestor(this.signupForm.value).subscribe(
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
