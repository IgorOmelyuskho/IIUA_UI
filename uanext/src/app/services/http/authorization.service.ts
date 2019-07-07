import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { StateService } from '../state/state.service';
import { environment } from '../../../environments/environment';
import { VendorDto, InvestorDto, UserRole } from '../../models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProfileService } from './profile.service';
import { AdminDto } from 'src/app/models/adminDto';
import { ProjectUserDto } from 'src/app/models/projectUserDto';
import { AuthService, SocialUser } from 'angularx-social-login';
import { SocialUserDto } from 'src/app/models/socialUserDto';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  socialNetworkUser: any;
  userRole: UserRole;
  needEmailForSocialLogin = false;

  constructor(
    private http: HttpClient,
    private stateService: StateService,
    private router: Router,
    private profileService: ProfileService,
    private socialAuthService: AuthService,
    private notify: NotificationService) { }

  init() {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialNetworkUser = user;
      console.log(this.socialNetworkUser);
      let resultToken: string = user.idToken;
      if (user.provider === 'FACEBOOK') {
        resultToken = user.authToken;
      }
      if (user.provider === 'GOOGLE') {
        resultToken = user.idToken;
      }
      const userForLogin: SocialUserDto = {
        token: resultToken,
        provider: user.provider,
        email: user.email // todo uncomment
      };
      console.log(userForLogin);
      console.log('UserRole = ', this.userRole);

      if (this.userRole == null) {
        this.socialUserLogin(userForLogin).subscribe(
          response => {
            console.log(response);
            if (response.status === 200) {
              if (response.body == null) {
                this.notify.show('Вам пришло сообщение на почту');
              } else {
                this.notify.show(response.body.data);
              }
            } else {
              this.notify.show(response.body.error);
            }
          },
          err => {
            if (err.error.error.errorMessage[0] === 'User not exist' && err.error.error.code === 8) {
              console.log('UNE');
              this.router.navigate(['signup']);
            }
          }
        );
      }

      if (this.userRole === UserRole.Vendor) {
        this.socialRegisterVendor(userForLogin).subscribe(
          response => {
            console.log(response);
            if (response.status === 200) {
              if (response.body == null) {
                this.notify.show('Вам пришло сообщение на почту');
              } else {
                this.notify.show(response.body.data);
              }
            } else {
              this.notify.show(response.body.error);
            }
          },
          err => {
            if (err.error.error.errorMessage[0] === 'User not exist' && err.error.error.code === 8) {
              console.log('UNE');
              this.router.navigate(['signup']);
            }
          }
        );
      }

      if (this.userRole === UserRole.Investor) {
        this.socialRegisterInvestor(userForLogin).subscribe(
          response => {
            console.log(response);
            if (response.status === 200) {
              if (response.body == null) {
                this.notify.show('Вам пришло сообщение на почту');
              } else {
                this.notify.show(response.body.data);
              }
            } else {
              this.notify.show(response.body.error);
            }
          },
          err => {
            if (err.error.error.errorMessage[0] === 'User not exist' && err.error.error.code === 8) {
              console.log('UNE');
              this.router.navigate(['signup']);
            }
          }
        );
      }
    });





    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    let decodedToken: any;
    let isExpired: boolean;
    let role: UserRole;

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
      role = decodedToken.role;
    } catch {
      this.signOut();
      return;
    }

    if (isExpired === true) {
      this.signOut();
      return;
    }

    this.checkRole(role);
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


  checkToken() {

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

  // any because api return different response
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

  signOut(): void {
    localStorage.removeItem('token');
    this.stateService.user$.next(null);
    this.stateService.authorized$.next(false);
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


