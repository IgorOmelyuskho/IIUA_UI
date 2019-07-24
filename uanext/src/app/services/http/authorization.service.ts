import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { StateService } from '../state/state.service';
import { environment } from '../../../environments/environment';
import { VendorDto, InvestorDto, UserRole, VendorRole, InvestorRole, AdminRole } from '../../models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProfileService } from './profile.service';
import { AdminDto } from 'src/app/models/adminDto';
import { ProjectUserDto } from 'src/app/models/projectUserDto';
import { AuthService, SocialUser } from 'angularx-social-login';
import { SocialUserDto } from 'src/app/models/socialUserDto';
import { NotificationService } from '../notification.service';
import { TranslateService } from '../translate.service';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { ProjectUserRole } from 'src/app/models/projectUserRole';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  needEmailForSocialLogin = false;
  userRoleForRegister: UserRole;
  provider: string; // GOOGLE FACEBOOK

  constructor(
    private http: HttpClient,
    private stateService: StateService,
    private router: Router,
    private profileService: ProfileService,
    private socialAuthService: AuthService,
    private notify: NotificationService,
    private translate: TranslateService) { }

  init() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    let decodedToken: any;
    let isExpired: boolean;
    let roleInToken: UserRole;

    if (window.location.href.includes('email-validate')) {
      return;
    }
    if (window.location.href.includes('password-recovery')) {
      return;
    }
    if (window.location.href.includes('privacy-policy')) {
      return;
    }
    if (window.location.href.includes('user-agreement')) {
      return;
    }

    if (token == null || token === '') {
      this.signOut();
      return;
    }

    try {
      decodedToken = helper.decodeToken(token);
      isExpired = helper.isTokenExpired(token);
      roleInToken = decodedToken.role;
    } catch {
      this.signOut();
      return;
    }

    if (isExpired === true) {
      this.signOut();
      return;
    }

    this.checkRole(roleInToken);
  }

  createSocialUserDto(user: SocialUser): SocialUserDto {
    let resultToken = '';
    if (user.provider === 'FACEBOOK') {
      resultToken = user.authToken;
    }
    if (user.provider === 'GOOGLE') {
      resultToken = user.idToken;
    }

    const result = {
      token: resultToken,
      provider: user.provider,
      email: user.email
    };

    return result;
  }

  checkRole(role: UserRole) {
    const pathName = window.location.pathname.slice();

    if (role !== UserRole.Admin && role !== UserRole.ProjectUser && role !== UserRole.Investor && role !== UserRole.Vendor) {
      this.signOut();
      return;
    }

    if (role === UserRole.Vendor) {
      this.profileService.fetchVendor().subscribe(
        vendor => {
          this.stateService.user$.next(vendor);
          this.stateService.authorized$.next(true);
          this.translate.getSphereActivityOption();
          if (pathName === '' || pathName === '/') {
            this.router.navigate(['home', 'vendor']);
          } else {
            this.router.navigateByUrl(pathName);
          }
        },
        err => {
          console.warn(err);
          this.signOut();
        }
      );
    }

    if (role === UserRole.Investor) {
      this.profileService.fetchInvestor().subscribe(
        investor => {
          this.stateService.user$.next(investor);
          this.stateService.authorized$.next(true);
          this.translate.getSphereActivityOption();
          if (pathName === '' || pathName === '/') {
            this.router.navigate(['home', 'investor']);
          } else {
            this.router.navigateByUrl(pathName);
          }
        },
        err => {
          console.warn(err);
          this.signOut();
        }
      );
    }

    if (role === UserRole.Admin) {
      this.profileService.fetchAdmin().subscribe(
        admin => {
          this.stateService.user$.next(admin);
          this.stateService.authorized$.next(true);
          this.translate.getSphereActivityOption();
          if (pathName === '' || pathName === '/') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigateByUrl(pathName);
          }
        },
        err => {
          console.warn(err);
          this.signOut();
        }
      );
    }

    if (role === UserRole.ProjectUser) {
      this.profileService.fetchProjectUser().subscribe(
        projectUser => {
          this.stateService.user$.next(projectUser);
          this.stateService.authorized$.next(true);
          this.translate.getSphereActivityOption();
          if (pathName === '' || pathName === '/') {
            this.router.navigate(['projectUser']);
          } else {
            this.router.navigateByUrl(pathName);
          }
        },
        err => {
          console.warn(err);
          this.signOut();
        }
      );
    }
  }

  signUpAsVendor(vendorDto: VendorDto): Observable<any> {
    return this.http.post<any>(environment.auth + environment.vendorRegister, vendorDto, { observe: 'response' });
  }

  signUpAsInvestor(investorDto: InvestorDto): Observable<any> {
    return this.http.post<any>(environment.auth + environment.investorRegister, investorDto, { observe: 'response' });
  }

  signUpAsAdmin(adminDto: AdminDto): Observable<any> {
    return this.http.post<any>(environment.auth + environment.adminRegister, adminDto, { observe: 'response' });
  }

  signUpAsProjectUser(projectUserDto: ProjectUserDto): Observable<any> {
    return this.http.post<any>(environment.auth + environment.projectUserRegister, projectUserDto, { observe: 'response' });
  }

  signIn(investorOrVendor: { password: string, email: string }): Observable<any> {
    return this.http.post<any>(environment.auth + environment.authenticate, investorOrVendor, { observe: 'response' });
  }

  emailValidate(code: string): Observable<any> {
    return this.http.get<any>(environment.auth + environment.emailValidate + code);
  }

  passwordRecovery(email: string): Observable<any> {
    return this.http.get<any>(environment.auth + environment.passwordRecovery + email);
  }

  passwordRecoveryCode(code: string, password: string): Observable<any> {
    return this.http.put<any>(environment.auth + environment.passwordRecovery_2 + code, { password: password }, { observe: 'response' });
  }

  socialRegisterVendor(user: SocialUserDto): Observable<any> {
    return this.http.post<any>(environment.auth + environment.socialAuthVendor, user, { observe: 'response' });
  }

  socialRegisterInvestor(user: SocialUserDto): Observable<any> {
    return this.http.post<any>(environment.auth + environment.socialAuthInvestor, user, { observe: 'response' });
  }

  socialUserLogin(user: SocialUserDto): Observable<any> {
    return this.http.post<any>(environment.auth + environment.socialAuth, user, { observe: 'response' });
  }




  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (socialUser: SocialUser) => {
        const userForLogin: SocialUserDto = this.createSocialUserDto(socialUser);
        this.socialUserLoginSubscribe(this.socialUserLogin(userForLogin));
      },
      (err: any) => {
        console.warn(err);
      }
    );
  }

  signInWithFB(email?: string): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (socialUser: SocialUser) => {
        const userForLogin: SocialUserDto = this.createSocialUserDto(socialUser);
        if (email != null) {
          userForLogin.email = email;
        }

        this.socialUserLoginSubscribe(this.socialUserLogin(userForLogin));
      },
      (err: any) => {
        console.warn(err);
      }
    );
  }

  socialUserLoginSubscribe(observable: Observable<any>) {
    observable.subscribe(
      response => {
        this.needEmailForSocialLogin = false;
        if (response.body == null) {
          this.notify.show(this.translate.data.checkEmailShared);
        } else {
          this.successSocialOrEmailLogin(response);
        }
      },
      err => {
        console.log(err);
        if (err.error.error.errorMessage[0] === 'User not exist' && err.error.error.code === 8) {
          this.notify.show(this.translate.data.firstNeedRegister);
          this.router.navigate(['signup']);
        }
        if (err.error.error.errorMessage[0] === 'User email not verified' && err.error.error.code === 8) {
          this.notify.show('User email not verified');
        }
      }
    );
  }




  signUpWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (socialUser: SocialUser) => {
        const userForLogin: SocialUserDto = this.createSocialUserDto(socialUser);

        if (this.userRoleForRegister === UserRole.Vendor) {
          this.socialUserRegisterSubscribe(
            this.socialRegisterVendor(userForLogin),
            'GOOGLE'
          );
        }
        if (this.userRoleForRegister === UserRole.Investor) {
          this.socialUserRegisterSubscribe(
            this.socialRegisterInvestor(userForLogin),
            'GOOGLE'
          );
        }
      },
      (err: any) => {
        console.warn(err);
      }
    );
  }

  signUpWithFB(email?: string): void { // use email when in facebook not exist email
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      (socialUser: SocialUser) => {
        const userForLogin: SocialUserDto = this.createSocialUserDto(socialUser);
        if (email != null) {
          userForLogin.email = email;
        }

        if (this.userRoleForRegister === UserRole.Vendor) {
          this.socialUserRegisterSubscribe(
            this.socialRegisterVendor(userForLogin),
            'FACEBOOK'
          );
        }
        if (this.userRoleForRegister === UserRole.Investor) {
          this.socialUserRegisterSubscribe(
            this.socialRegisterInvestor(userForLogin),
            'FACEBOOK'
          );
        }
      },
      (err: any) => {
        console.warn(err);
      }
    );
  }

  socialUserRegisterSubscribe(observable: Observable<any>, provider: string) {
    observable.subscribe(
      response => {
        this.needEmailForSocialLogin = false;
        if (response.body == null) {
          if (provider === 'FACEBOOK') {
            this.notify.show(this.translate.data.checkEmailShared);
          }
          if (provider === 'GOOGLE') {
            this.router.navigate(['signin']);
          }
        }
      },
      err => {
        console.log(err);
        if (err.error.error.errorMessage[0] === 'User not exist' && err.error.error.code === 8) {
          this.notify.show(this.translate.data.firstNeedRegister);
          this.router.navigate(['signup']);
        }
        if (err.error.error.errorMessage[0] === 'Email is empty' && err.error.error.code === 8 && provider === 'FACEBOOK') {
          this.needEmailForSocialLogin = true;
        }
        if (err.error.error.errorMessage[0].includes('already taken') && err.error.error.code === 8) {
          this.notify.show(err.error.error.errorMessage[0]);
        }
      }
    );
  }





  fetchVendorSubscribe(observable: Observable<VendorRole>): void {
    observable.subscribe(
      (vendor: VendorRole) => {
        this.stateService.user$.next(vendor);
        this.stateService.authorized$.next(true);
        this.translate.getSphereActivityOption();
        this.router.navigate(['home', 'vendor']);
      },
      err => {
        console.warn(err);
        this.signOut();
      }
    );
  }

  fetchInvestorSubscribe(observable: Observable<InvestorRole>): void {
    observable.subscribe(
      (investor: InvestorRole) => {
        this.stateService.user$.next(investor);
        this.stateService.authorized$.next(true);
        this.translate.getSphereActivityOption();
        this.router.navigate(['home', 'investor']);
      },
      err => {
        console.warn(err);
        this.signOut();
      }
    );
  }

  fetchAdminSubscribe(observable: Observable<AdminRole>): void {
    observable.subscribe(
      (admin: AdminRole) => {
        this.stateService.user$.next(admin);
        this.stateService.authorized$.next(true);
        this.translate.getSphereActivityOption();
        this.router.navigate(['admin']);
      },
      err => {
        console.warn(err);
        this.signOut();
      }
    );
  }

  fetchProjectUserSubscribe(observable: Observable<ProjectUserRole>): void {
    observable.subscribe(
      (projectUser: ProjectUserRole) => {
        this.stateService.user$.next(projectUser);
        this.stateService.authorized$.next(true);
        this.translate.getSphereActivityOption();
        this.router.navigate(['projectUser']);
      },
      err => {
        console.warn(err);
        this.signOut();
      }
    );
  }





  successSocialOrEmailLogin(response: any) {
    console.log(response);

    localStorage.setItem('token', response.body.token);
    const role: UserRole = this.stateService.role();

    if (role === UserRole.Vendor) {
      this.fetchVendorSubscribe(this.profileService.fetchVendor());
    }
    if (role === UserRole.Investor) {
      this.fetchInvestorSubscribe(this.profileService.fetchInvestor());
    }
    if (role === UserRole.Admin) {
      this.fetchAdminSubscribe(this.profileService.fetchAdmin());
    }
    if (role === UserRole.ProjectUser) {
      this.fetchProjectUserSubscribe(this.profileService.fetchProjectUser());
    }
  }




  signOut(): void { // duplicated
    localStorage.removeItem('token');
    this.stateService.user$.next(null);
    this.stateService.authorized$.next(false);
    this.stateService.interactiveInvestmentProject$.next(null);
    this.router.navigate(['']);
    this.socialAuthService.signOut();
  }

  userIsAuthorized(): boolean {
    if (this.stateService.authorized$.getValue() === true && this.stateService.user$.getValue() !== null) {
      return true;
    } else {
      return false;
    }
  }
}


