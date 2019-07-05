import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/models';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userRole: UserRole = UserRole.Vendor; // DEFAULT
  showProgress = false;
  useEmail = false;
  self = 'SignupComponent';

  constructor(private socialAuthService: AuthService, private authService: AuthorizationService) {}

  ngOnInit() {
    this.authService.userRole = this.userRole;
    console.log(this.authService.userRole);
   }

  asVendor() {
    this.userRole = UserRole.Vendor;
    this.authService.userRole = this.userRole;
  }

  asInvestor() {
    this.userRole = UserRole.Investor;
    this.authService.userRole = this.userRole;
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
