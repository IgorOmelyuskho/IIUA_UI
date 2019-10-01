import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-project-user-page',
  templateUrl: './project-user-page.component.html',
  styleUrls: ['./project-user-page.component.scss']
})
export class ProjectUserPageComponent implements OnInit, AfterViewInit {
  @ViewChild('profile') profileTab: ElementRef;
  @ViewChild('upload') uploadTab: ElementRef;
  self = 'ProjectUserPageComponent';
  languageMenuIsOpen = false;

  constructor(private router: Router, private authService: AuthorizationService, public translateService: TranslateService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const url = this.router.url.split('/');
    const tab = url[url.length - 1];
    if (tab === 'profile') {
      this.profileTab.nativeElement.classList.add('selected');
    }
    if (tab === 'upload3dModel') {
      this.uploadTab.nativeElement.classList.add('selected');
    }
  }

  goToProfile() {
    this.profileTab.nativeElement.classList.add('selected');
    this.uploadTab.nativeElement.classList.remove('selected');
    this.router.navigate(['projectUser', 'profile']);
  }

  uploadModel() {
    this.profileTab.nativeElement.classList.remove('selected');
    this.uploadTab.nativeElement.classList.add('selected');
    this.router.navigate(['admin', 'upload3dModel']);
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

  signOut() {
    this.authService.signOut();
  }

}
