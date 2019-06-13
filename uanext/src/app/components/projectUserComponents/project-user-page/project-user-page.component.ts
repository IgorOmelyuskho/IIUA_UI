import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-project-user-page',
  templateUrl: './project-user-page.component.html',
  styleUrls: ['./project-user-page.component.scss']
})
export class ProjectUserPageComponent implements OnInit {
  self = 'ProjectUserPageComponent';

  constructor(private router: Router, private authService: AuthorizationService, private translateService: TranslateService) { }

  ngOnInit() {
  }

  languageChange(e) {
    if (e.target.value === 'ru') {
      this.translateService.use('ru').then(() => {});
    }
    if (e.target.value === 'en') {
      this.translateService.use('en').then(() => {});
    }
  }

  goToProfile() {
    this.router.navigate(['projectUser', 'profile']);
  }

  signOut() {
    this.authService.signOut();
  }

}
