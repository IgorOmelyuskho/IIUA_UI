import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/models';
import { AuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { SocialUserDto } from 'src/app/models/socialUserDto';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
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
    private notify: NotificationService,
    private router: Router,
    private translate: TranslateService) { }

  ngOnInit() { }

  asVendor() {
    this.userRole = UserRole.Vendor;
  }

  asInvestor() {
    this.userRole = UserRole.Investor;
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
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (socialUser: SocialUser) => {
        const userForLogin: SocialUserDto = this.authService.createSocialUserDto(socialUser);

        if (this.userRole === UserRole.Vendor) {
          this.socialUserLoginSubscribe(this.authService.socialRegisterVendor(userForLogin));
        }
        if (this.userRole === UserRole.Investor) {
          this.socialUserLoginSubscribe(this.authService.socialRegisterInvestor(userForLogin));
        }
      },
      (err: any) => {
        console.warn(err);
      }
    );
  }

  signUpWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (socialUser: SocialUser) => {
        const userForLogin: SocialUserDto = this.authService.createSocialUserDto(socialUser);

        if (this.userRole === UserRole.Vendor) {
          this.socialUserLoginSubscribe(this.authService.socialRegisterVendor(userForLogin));
        }
        if (this.userRole === UserRole.Investor) {
          this.socialUserLoginSubscribe(this.authService.socialRegisterInvestor(userForLogin));
        }
      },
      (err: any) => {
        console.warn(err);
      }
    );
  }

  socialUserLoginSubscribe(observable: Observable<any>) {
    observable.subscribe(
      response => {
        console.log(response);
        if (response.status === 200) {
          if (response.body == null) {
            this.notify.show(this.translate.data.checkEmailShared);
          } else {
            this.notify.show(response.body.data);
          }
        } else {
          this.notify.show(response.body.error);
        }
      },
      err => {
        if (err.error.error.errorMessage[0] === 'User not exist' && err.error.error.code === 8) {
          this.notify.show(this.translate.data.firstNeedRegister);
          this.router.navigate(['signup']);
        }
      }
    );
  }

}
