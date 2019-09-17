import FormHelper from '../../../helperClasses/helperClass';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../../services/http/authorization.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { matchOtherValidator } from '../../../validators/validators';
import { NotificationService } from 'src/app/services/notification.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-signup-investor',
  templateUrl: './signup-investor.component.html',
  styleUrls: ['./signup-investor.component.scss']
})
export class SignupInvestorComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  FormHelper = FormHelper;
  @Output() showProgress = new EventEmitter<boolean>();
  self = 'SignupInvestorComponent';
  @ViewChild('passwordInput') passwordInput: ElementRef;
  @ViewChild('togglePasswordImg') togglePasswordImg: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router,
    private notify: NotificationService,
    private translate: TranslateService
  ) {
    this.signupForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      // creditCardNumber: ['', [Validators.required, Validators.pattern(FormHelper.creditCardPattern)]],
      email: ['', [Validators.required, Validators.pattern(FormHelper.emailPattern)]],
      // phone: ['', [Validators.required, Validators.pattern(FormHelper.phonePattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // rePassword: ['', [Validators.required, matchOtherValidator('password')]],
    });
  }

  ngOnInit() {
  }

  get formControls() {
    return this.signupForm.controls;
  }

  togglePasswordVisible() {
    if (this.passwordInput.nativeElement.type === 'password') {
      this.passwordInput.nativeElement.type = 'text';
      this.togglePasswordImg.nativeElement.src = '../../../../assets/img/hide-password.png';
    } else {
      this.passwordInput.nativeElement.type = 'password';
      this.togglePasswordImg.nativeElement.src = '../../../../assets/img/show-password.png';
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.showProgress.emit(true);

    this.authService.signUpAsInvestor(this.signupForm.value).subscribe(
      response => {
        this.showProgress.emit(false);
        if (response.body == null || response.body.token == null) {
          this.notify.show(this.translate.data['SignupInvestorComponent'].checkEmail);
        }
      },
      err => {
        console.warn(err);
        this.showProgress.emit(false);
        this.notify.show(err.error.error.errorMessage[0]);
      }
    );
  }

}
