import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/http/authorization.service';

@Component({
  selector: 'app-vendor-navbar',
  templateUrl: './vendor-navbar.component.html',
  styleUrls: ['./vendor-navbar.component.scss']
})
export class VendorNavbarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthorizationService) { }

  ngOnInit() {
  }

  home() {
    this.router.navigate(['home', 'vendor', 'main-page']);
  }

  goToProfile() {
    this.router.navigate(['home', 'vendor', 'profile']);
  }

  goToProjects() {
    this.router.navigate(['home', 'vendor', 'projects']);
  }

  signOut() {
    this.authService.signOut();
  }

}
