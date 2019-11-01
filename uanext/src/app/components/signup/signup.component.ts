import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/models';
import { AuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { SocialUserDto } from 'src/app/models/socialUserDto';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app/services/translate.service';

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

  constructor(private socialAuthService: AuthService,
    private authService: AuthorizationService,
    private notify: ToastService,
    private router: Router,
    private translate: TranslateService) { }

  ngOnInit() {
    this.authService.userRoleForRegister = this.userRole;
  }

  asVendor() {
    this.userRole = UserRole.Vendor;
    this.authService.userRoleForRegister = this.userRole;
  }

  asInvestor() {
    this.userRole = UserRole.Investor;
    this.authService.userRoleForRegister = this.userRole;
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

  signUpWithGoogle(): void {
    this.authService.signUpWithGoogle(); // userRole in this.authService.userRoleForRegister
  }

  signUpWithFB(): void {
    this.authService.signUpWithFB(); // userRole in this.authService.userRoleForRegister
  }


}
