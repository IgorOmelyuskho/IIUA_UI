import { Component, OnInit, ApplicationRef } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/models';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userRole: string;

  constructor(private router: Router, private translateService: TranslateService, private ref: ApplicationRef) { }

  ngOnInit() {
  }

  ru() {
    this.translateService.use('ru').then(() => {
      this.ref.tick();
    });
  }

  en() {
    this.translateService.use('en').then(() => {
      this.ref.tick();
    });
  }

  signIn() {
    this.router.navigate(['signin']);
  }

  signUp() {
    this.router.navigate(['signup']);
  }
}
