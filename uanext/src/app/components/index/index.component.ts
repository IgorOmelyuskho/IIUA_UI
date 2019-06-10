import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRole } from 'src/app/models';
import { AuthorizationService } from 'src/app/services/http/authorization.service';

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

  constructor(private authService: AuthorizationService) { }

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
     this.slide = new slidePage({
      before: (origin, direction, target) => {
        this.canScrollDown = true;
        this.canScrollUp = true;
        if (target === 1) {
          this.canScrollUp = false;
        }
        if (target === 4) {
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
}
