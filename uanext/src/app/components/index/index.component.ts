import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRole } from 'src/app/models';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

// declare const gapi: any;

declare const slidePage;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {
  userRole: UserRole;
  slide: any;
  canScrollUp = false;
  canScrollDown = true;
  self = 'IndexComponent';
  auth2: any;

  user: SocialUser;
  loggedIn: boolean;

  constructor(private socialAuthService: AuthService) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    let decodedToken: any;
    let role: UserRole;

    if (token == null || token === '') {
      return;
    }

    try {
      decodedToken = helper.decodeToken(token);
      role = decodedToken.role;
    } catch {
      return;
    }

    if (role !== UserRole.Admin && role !== UserRole.ProjectUser && role !== UserRole.Investor && role !== UserRole.Vendor) {
      this.userRole = null;
    }

    if (role === UserRole.Vendor) {
      this.userRole = UserRole.Vendor;
    }

    if (role === UserRole.Investor) {
      this.userRole = UserRole.Investor;
    }

    if (role === UserRole.Admin) {
      this.userRole = UserRole.Admin;
    }

    if (role === UserRole.ProjectUser) {
      this.userRole = UserRole.ProjectUser;
    }
  }

  ngAfterViewInit() {
    // this.googleInit();

    this.slide = new slidePage({
      before: (origin, direction, target) => {
        this.canScrollDown = true;
        this.canScrollUp = true;
        if (target === 1) {
          this.canScrollUp = false;
        }
        if (target === 5) {
          this.canScrollDown = false;
        }
      }
    });
  }

  slideUp() {
    this.slide.slidePrev();
  }

  slideDown() {
    this.slide.slideNext();
  }

  ngOnDestroy() {
    this.slide.destroy();
  }

  // googleInit() {
  //   gapi.load('auth2', () => {
  //     this.auth2 = gapi.auth2.init({
  //       client_id: '881274996713-i4d6ucdff7ljsga7vji3np737g1r63dn.apps.googleusercontent.com',
  //       cookiepolicy: 'single_host_origin',
  //       scope: 'profile email'
  //     });
  //     this.attachSignin(document.getElementById('googleBtn'));
  //   });
  // }

  // attachSignin(element) {
  //   this.auth2.attachClickHandler(element, {},
  //     (googleUser) => {
  //       const profile = googleUser.getBasicProfile();
  //       console.log(profile);
  //       console.log('Token || ' + googleUser.getAuthResponse().id_token);
  //       console.log('ID: ' + profile.getId());
  //       console.log('Name: ' + profile.getName());
  //       console.log('Image URL: ' + profile.getImageUrl());
  //       console.log('Email: ' + profile.getEmail());
  //     }, (error) => {
  //       alert(JSON.stringify(error, undefined, 2));
  //     });
  // }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

}
