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

  languageChange(e) {
    if (e.target.value === 'ru') {
      this.translateService.use('ru').then(() => {});
    }
    if (e.target.value === 'en') {
      this.translateService.use('en').then(() => {});
    }
  }

  signOut() {
    this.authService.signOut();
  }

}
