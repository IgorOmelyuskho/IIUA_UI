import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InvestorRole } from 'src/app/models';
import { AuthorizationService } from 'src/app/services/auth/authorization.service';

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.scss']
})
export class InvestorComponent implements OnInit {

  constructor(private router: Router, private authService: AuthorizationService) {}

  ngOnInit() {
  }

  goToProfile() {
    this.router.navigate(['home', 'investor', 'profile']);
  }

  signOut() {
    this.authService.signOut();
  }

}


