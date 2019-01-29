import { AuthorizationService } from './../../services/authorization.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthorizationService) {
    this.signupForm = this.formBuilder.group({
      login: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [this.matchOtherValidator('password')]],
    });
  }

  ngOnInit() {
  }

  get formControls() {
    return this.signupForm.controls;
  }

  matchOtherValidator(otherControlName: string): any {
    let thisControl: FormControl;
    let otherControl: FormControl;

    return function matchOtherValidate(control: FormControl): any {

      if (!control.parent) {
        return null;
      }

      if (!thisControl) {
        thisControl = control;
        otherControl = control.parent.get(otherControlName) as FormControl;
        if (!otherControl) {
          throw new Error('matchOtherValidator(): other control is not found in parent group');
        }
        otherControl.valueChanges.subscribe(() => {
          thisControl.updateValueAndValidity();
        });
      }

      if (!otherControl) {
        return null;
      }

      if (otherControl.value !== thisControl.value) {
        return {
          matchOther: true
        };
      }

      return null;
    };
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.authService.signUp(this.signupForm.value).subscribe(
      response => {
        console.log(response);
      },
      err => {
        console.log(err);
      }
    );
  }

}
