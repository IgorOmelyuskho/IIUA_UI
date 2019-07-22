import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-email-validate',
  templateUrl: './email-validate.component.html',
  styleUrls: ['./email-validate.component.scss']
})
export class EmailValidateComponent implements OnInit, AfterViewInit {
  self = 'EmailValidateComponent';
  code: string;
  emailBeingVerified = true;
  failedConfirmEmail = false;

  constructor(private authService: AuthorizationService, private router: Router) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.confirmEmail();
  }

  confirmEmail() {
    const urlArr = window.location.href.split('/');
    this.code = urlArr[urlArr.length - 1];
    this.authService.emailValidate(this.code).pipe(
      delay(5000)
    )
      .subscribe(
        val => {
          this.emailBeingVerified = false;
          if (val.mailIsVerified === true) {
            this.router.navigate(['signin']);
          } else {
            this.failedConfirmEmail = true;
          }
        },
        err => {
          this.failedConfirmEmail = true;
          this.emailBeingVerified = false;
        }
      );
  }

}
