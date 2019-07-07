import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-validate',
  templateUrl: './email-validate.component.html',
  styleUrls: ['./email-validate.component.scss']
})
export class EmailValidateComponent implements OnInit, AfterViewInit {
  self = 'EmailValidateComponent';
  code: string;

  constructor(private authService: AuthorizationService, private router: Router) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.confirmEmail();
  }

  confirmEmail() {
    setTimeout(() => {
      const urlArr = window.location.href.split('/');
      this.code = urlArr[urlArr.length - 1];
      console.log(this.code);
      this.authService.emailValidate(this.code).subscribe(
        (val) => {
          console.log(val);
          // todo - true in JSON?
          if (val === true) {
            this.router.navigate(['signin']);
          }
        }
      );
    }, 7000);
  }

}
