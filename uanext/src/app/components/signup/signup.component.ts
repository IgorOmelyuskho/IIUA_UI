import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/models';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userRole = 'Vendor'; // DEFAULT
  showProgress = false;

  constructor() { }

  ngOnInit() { }

  asVendor() { // use for button
    this.userRole = UserRole.Vendor; // use only  for HTML
  }

  asInvestor() { // use for button
    this.userRole = UserRole.Investor; // use only  for HTML
  }

  showProgressBar(show: boolean) {
    if (show === true) {
      this.showProgress = true;
    } else {
      this.showProgress = false;
    }
  }

}
