import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userRole: string;
  self = 'HeaderComponent';
  mediaQueryString = 'screen and (max-width: 460px)'; // also used in .scss
  mq = window.matchMedia(this.mediaQueryString);
  matchesMediaQuery = false;
  menuIsOpen = false;
  languageMenuIsOpen = false;

  constructor(private router: Router, public translateService: TranslateService) { }

  ngOnInit() {
    this.initMenu();
    this.mq.addListener(this.matchMediaHandler);
  }

  initMenu() {
    this.matchesMediaQuery = window.matchMedia(this.mediaQueryString).matches;
    if (this.matchesMediaQuery === true) {
      this.menuIsOpen = false;
    } else {
      this.menuIsOpen = true;
    }
  }

  matchMediaHandler = (data) => {
    this.matchesMediaQuery = data.matches;
    if (this.matchesMediaQuery === true) {
      this.menuIsOpen = false;
    } else {
      this.menuIsOpen = true;
    }
  }

  languageChange(lang) {
    if (lang === 'ru') {
      this.translateService.use('ru').then(() => { });
    }
    if (lang === 'en') {
      this.translateService.use('en').then(() => { });
    }
    this.languageMenuIsOpen = false;
  }

  openLanguageMenu() {
    this.languageMenuIsOpen = !this.languageMenuIsOpen;
  }

  signIn() {
    this.router.navigate(['signin']);
  }

  signUp() {
    this.router.navigate(['signup']);
  }

  ngOnDestroy() {
    this.mq.removeListener(this.matchMediaHandler);
  }
}
