import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/models';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userRole = 'Vendor'; // DEFAULT
  showProgress = false;
  useEmail = false;
  self = 'SignupComponent';

  constructor(private socialAuthService: AuthService) {}

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

  useEmailForSignUp() {
    this.useEmail = true;
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
