import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  constructor(private router: Router, private authService: AuthorizationService) { }

  ngOnInit() {
  }

  home() {
    this.router.navigate(['home', 'vendor']);
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
