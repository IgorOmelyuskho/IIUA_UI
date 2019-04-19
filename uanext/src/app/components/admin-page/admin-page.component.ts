import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(private router: Router, private authService: AuthorizationService) { }

  ngOnInit() {
  }

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
