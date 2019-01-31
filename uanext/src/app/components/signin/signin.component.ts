import { Router } from '@angular/router';
import { AuthorizationService } from './../../services/authorization.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthorizationService, private router: Router) {
    this.signinForm = this.formBuilder.group({
      username: ['', Validators.required],
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
        this.router.navigate(['home']);
      },
      err => {
        console.warn(err);
      }
    );
  }

}
