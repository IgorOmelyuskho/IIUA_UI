import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import FormHelper from 'src/app/helperClasses/helperClass';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.scss']
})
export class PasswordRecoveryComponent implements OnInit {
  self = 'PasswordRecoveryComponent';
  recoveryForm: FormGroup;
  FormHelper = FormHelper;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private notify: NotificationService,
    private translate: TranslateService
  ) {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(FormHelper.emailPattern)]],
    });
  }

  ngOnInit() {
  }

  get formControls() {
    return this.recoveryForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.recoveryForm.invalid) {
      return;
    }

    this.authService.passwordRecovery(this.recoveryForm.value.email).subscribe(
      response => {
        console.log(response);
        this.notify.show(this.translate.data['PasswordRecoveryComponent'].checkEmail);
      },
      err => {
        console.warn(err);
      }
    );
  }

}
