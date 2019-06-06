import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRole } from 'src/app/models';
import { AuthorizationService } from 'src/app/services/http/authorization.service';

declare const slidePage;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, AfterViewInit {
  userRole: UserRole;

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
    const slide = new slidePage();
    // console.log(slide);
  }
}
