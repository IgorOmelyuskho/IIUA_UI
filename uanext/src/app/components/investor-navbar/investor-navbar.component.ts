import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';

@Component({
  selector: 'app-investor-navbar',
  templateUrl: './investor-navbar.component.html',
  styleUrls: ['./investor-navbar.component.scss']
})
export class InvestorNavbarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthorizationService) { }

  ngOnInit() {
  }

  home() {
    this.router.navigate(['home', 'investor', 'main-page']);
  }

  goToProfile() {
    this.router.navigate(['home', 'investor', 'profile']);
  }

  signOut() {
    this.authService.signOut();
  }

  viewProjects() {
    this.router.navigate(['home', 'investor', 'viewProjects']);
  }

}
