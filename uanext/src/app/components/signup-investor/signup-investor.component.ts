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
  mask: any[] = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router,
    private notify: NotificationService
  ) {
    this.signupForm = this.formBuilder.group({
      fullName: ['fullName', Validators.required],
      email: ['email123q@qwe.com', [Validators.required, Validators.email]],
      creditCardNumber: ['1111222233334444', Validators.pattern(/([0-9\s]){19}$/)],
      password: ['12345!@QWE', [Validators.required, Validators.minLength(6)]],
      rePassword: ['12345!@QWE', [Validators.required, matchOtherValidator('password')]],
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
