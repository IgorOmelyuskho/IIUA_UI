import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-investor-navbar',
  templateUrl: './investor-navbar.component.html',
  styleUrls: ['./investor-navbar.component.scss']
})
export class InvestorNavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('home') homeTab: ElementRef;
  @ViewChild('profile') profileTab: ElementRef;
  @ViewChild('vieProjects') vieProjectsTab: ElementRef;

  constructor(private router: Router, private authService: AuthorizationService, private translateService: TranslateService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const url = this.router.url.split('/');
    const tab = url[url.length - 1];
    if (tab === 'profile') {
      this.profileTab.nativeElement.classList.add('selected');
    }
    if (tab === 'viewProjects') {
      this.vieProjectsTab.nativeElement.classList.add('selected');
    }
    if (tab === 'main-page') {
      this.homeTab.nativeElement.classList.add('selected');
    }
  }

  homeClick() {
    this.profileTab.nativeElement.classList.remove('selected');
    this.vieProjectsTab.nativeElement.classList.remove('selected');
    this.homeTab.nativeElement.classList.add('selected');
    this.router.navigate(['home', 'investor', 'main-page']);
  }

  profileClick() {
    this.profileTab.nativeElement.classList.add('selected');
    this.vieProjectsTab.nativeElement.classList.remove('selected');
    this.homeTab.nativeElement.classList.remove('selected');
    this.router.navigate(['home', 'investor', 'profile']);
  }

  signOutClick() {
    this.authService.signOut();
  }

  viewProjectsClick() {
    this.profileTab.nativeElement.classList.remove('selected');
    this.vieProjectsTab.nativeElement.classList.add('selected');
    this.homeTab.nativeElement.classList.remove('selected');
    this.router.navigate(['home', 'investor', 'viewProjects']);
  }

  languageChange(e) {
    if (e.target.value === 'ru') {
      this.translateService.use('ru').then(() => {});
    }
    if (e.target.value === 'en') {
      this.translateService.use('en').then(() => {});
    }
  }
}
