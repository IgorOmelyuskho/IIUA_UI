import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { TranslateService } from 'src/app/services/translate.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-investor-navbar',
  templateUrl: './investor-navbar.component.html',
  styleUrls: ['./investor-navbar.component.scss']
})
export class InvestorNavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('home') homeTab: ElementRef;
  @ViewChild('profile') profileTab: ElementRef;
  @ViewChild('vieProjects') vieProjectsTab: ElementRef;
  self = 'InvestorNavbarComponent';
  mediaQueryString = 'screen and (max-width: 760px)'; // also used in .scss
  mq = window.matchMedia(this.mediaQueryString);
  matchesMediaQuery = false;
  menuIsOpen = false;
  routerSubscription: Subscription;

  constructor(private router: Router, private authService: AuthorizationService, public translateService: TranslateService) { }

  ngOnInit() {
    this.initMenu();

    this.mq.addListener(this.matchMediaHandler);

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setSelectedTab(event.urlAfterRedirects);
      }
    });
  }

  ngAfterViewInit() {
    this.setSelectedTab(this.router.url);
  }

  setSelectedTab(url: string) {
    const urlArr: string[] = url.split('/');
    const endOfUrl: string = urlArr[urlArr.length - 1];

    this.homeTab.nativeElement.classList.remove('selected');
    this.profileTab.nativeElement.classList.remove('selected');
    this.vieProjectsTab.nativeElement.classList.remove('selected');

    if (endOfUrl === 'profile') {
      this.profileTab.nativeElement.classList.add('selected');
    }
    if (endOfUrl === 'viewProjects') {
      this.vieProjectsTab.nativeElement.classList.add('selected');
    }
    if (endOfUrl === 'main-page') {
      this.homeTab.nativeElement.classList.add('selected');
    }
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

  homeClick() {
    this.router.navigate(['home', 'investor', 'main-page']);
  }

  profileClick() {
    this.router.navigate(['home', 'investor', 'profile']);
  }

  signOutClick() {
    this.authService.signOut();
    this.router.navigate(['signin']);
  }

  viewProjectsClick() {
    this.router.navigate(['home', 'investor', 'viewProjects']);
  }

  languageChange(e) {
    if (e.target.value === 'ru') {
      this.translateService.use('ru').then(() => { });
    }
    if (e.target.value === 'en') {
      this.translateService.use('en').then(() => { });
    }
  }

  ngOnDestroy() {
    this.mq.removeListener(this.matchMediaHandler);
    this.routerSubscription.unsubscribe();
  }
}
