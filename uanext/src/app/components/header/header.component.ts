import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthorizationService, private router: Router) { }

  ngOnInit() {
  }

  home() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    let decodedToken: any;
    let isExpired: boolean;
    let role: string;

    if (token == null || token === '') {
      this.authService.signOut();
      return;
    }

    try {
      decodedToken = helper.decodeToken(token);
      isExpired = helper.isTokenExpired(token);
      role = decodedToken.role;
    } catch {
      this.authService.signOut();
      return;
    }

    if (isExpired === true) {
      this.authService.signOut();
      return;
    }

    if (role !== 'Admin' && role !== 'Investor' && role !== 'Vendor') {
      this.authService.signOut();
      return;
    }

    if (role === 'Vendor') {
      this.router.navigate(['home', 'vendor']);
    }

    if (role === 'Investor') {
      this.router.navigate(['home', 'investor']);
    }
  }
}
