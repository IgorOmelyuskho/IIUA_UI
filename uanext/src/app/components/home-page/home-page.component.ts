import { AuthorizationService } from './../../services/authorization.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  userRole: string; // investor or vendor

  constructor(private router: Router, private authService: AuthorizationService) { }

  ngOnInit() {
    if (this.authService.userIsAuthorized() === true) {
      return;
    }

    this.authService.fetchUser().subscribe(
      response => {
        this.userRole = this.authService.getLocalUser().role;

        // или не редиректить сразу юзера на vendor/investor, может есть чтото на этой странице?

        // if (this.userRole === 'vendor') {
        //   this.router.navigate(['home', 'vendor']);
        // } else if (this.userRole === 'investor') {
        //   this.router.navigate(['home', 'investor']);
        // }
      },
      err => {
        this.authService.signOut();
      }
    );
  }

}
