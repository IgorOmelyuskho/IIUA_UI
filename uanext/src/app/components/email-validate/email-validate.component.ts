import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-validate',
  templateUrl: './email-validate.component.html',
  styleUrls: ['./email-validate.component.scss']
})
export class EmailValidateComponent implements OnInit {
  self = 'EmailValidateComponent';
  code: string;

  constructor(private authService: AuthorizationService, private router: Router) { }

  ngOnInit() {
    const urlArr = window.location.href.split('/');
    this.code = urlArr[urlArr.length - 1];
  }

  confirmEmail() {
    this.authService.emailValidate(this.code).subscribe(
      (val) => {
        if (val === true) {
          this.router.navigate(['signin']);
        }
      }
    );
  }

}
