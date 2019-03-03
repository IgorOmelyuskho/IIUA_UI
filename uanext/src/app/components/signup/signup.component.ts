import { Component, OnInit } from '@angular/core';
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

  asVendor() {
    this.userRole = 'Vendor';
  }

  asInvestor() {
    this.userRole = 'Investor';
  }

  showProgressBar(show: boolean) {
    if (show === true) {
      this.showProgress = true;
    } else {
      this.showProgress = false;
    }
  }

}
