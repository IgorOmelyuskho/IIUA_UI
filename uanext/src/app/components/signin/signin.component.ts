import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AuthorizationService } from '../../services/auth/authorization.service';
import { StateService } from './../../services/state/state.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router,
    private stateService: StateService) {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }

  get formControls() {
    return this.signinForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signinForm.invalid) {
      return;
    }

    this.authService.signIn(this.signinForm.value).subscribe(
      response => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem('token', response.body.token);
          this.stateService.user$.next(response.body); // or fetchUser?
          this.stateService.authorized$.next(true);
        }
        this.router.navigate(['home']);
      },
      err => {
        console.warn(err);
      }
    );
  }

}
