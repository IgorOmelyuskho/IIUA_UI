import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import FormHelper from 'src/app/helperClasses/helperClass';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  self = 'PasswordRecoveryComponent';
  signinForm: FormGroup;
  FormHelper = FormHelper;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router,
  ) {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(FormHelper.emailPattern)]],
    });
  }

  ngOnInit() {
  }

  get formControls() {
    return this.signinForm.controls;
  }

  onSubmit() {
    if (this.signinForm.invalid) {
      return;
    }

    this.authService.signIn(this.signinForm.value).subscribe(
      response => {
        console.log(response);
      },
      err => {
        console.warn(err);
      }
    );
  }

}
