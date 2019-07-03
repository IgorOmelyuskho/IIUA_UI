import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import FormHelper from 'src/app/helperClasses/helperClass';

@Component({
  selector: 'app-confirm-password-recovery',
  templateUrl: './confirm-password-recovery.component.html',
  styleUrls: ['./confirm-password-recovery.component.scss']
})
export class ConfirmPasswordRecoveryComponent implements OnInit {
  self = 'ConfirmPasswordRecoveryComponent';
  recoveryForm: FormGroup;
  FormHelper = FormHelper;
  submitted = false;

  constructor(private authService: AuthorizationService, private router: Router, private formBuilder: FormBuilder) {
    this.recoveryForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }

  get formControls() {
    return this.recoveryForm.controls;
  }

  recoverPassword() {
    this.submitted = true;

    if (this.recoveryForm.invalid) {
      return;
    }

    const arr = window.location.href.split('/');
    const code = arr[arr.length - 1];
    this.authService.passwordRecoveryCode(code, this.recoveryForm.value.password).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['signin']);
      },
      err => {
        console.warn(err);
      }
    );
  }

}
