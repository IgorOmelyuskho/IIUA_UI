import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/http/authorization.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(private router: Router, private authService: AuthorizationService) { }

  ngOnInit() {
  }

  // signUp() {
  //   this.router.navigate(['admin', 'signup']);
  // }

  // signIn() {
  //   this.router.navigate(['admin', 'signin']);
  // }

  goToProfile() {
    this.router.navigate(['admin', 'profile']);
  }

  uploadModel() {
    this.router.navigate(['admin', 'upload3dModel']);
  }

  signOut() {
    this.authService.signOut();
  }

}
