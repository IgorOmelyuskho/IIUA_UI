import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { VendorProject } from 'src/app/models/vendorProject';
import { responseProject, responseProject2 } from '../../../helperClasses/projects';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-vendor-navbar',
  templateUrl: './vendor-navbar.component.html',
  styleUrls: ['./vendor-navbar.component.scss']
})
export class VendorNavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('home') homeTab: ElementRef;
  @ViewChild('profile') profileTab: ElementRef;
  @ViewChild('myProjects') myProjectsTab: ElementRef;

  projects: VendorProject[] = [
    {...responseProject},
    {...responseProject},
    {...responseProject2},
    {...responseProject2},
  ];

  profileSelectedProject: VendorProject;
  profileMenuOpen = false;

  constructor(private router: Router, private authService: AuthorizationService, private translateService: TranslateService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const url = this.router.url.split('/');
    const tab = url[url.length - 1];
    if (tab === 'profile') {
      this.profileTab.nativeElement.classList.add('selected');
    }
    if (tab === 'projects') {
      this.myProjectsTab.nativeElement.classList.add('selected');
    }
    if (tab === 'main-page') {
      this.homeTab.nativeElement.classList.add('selected');
    }
  }

  homeClick() {
    this.profileTab.nativeElement.classList.remove('selected');
    this.myProjectsTab.nativeElement.classList.remove('selected');
    this.homeTab.nativeElement.classList.add('selected');
    this.router.navigate(['home', 'vendor', 'main-page']);
  }

  profileClick() {
    this.profileTab.nativeElement.classList.add('selected');
    this.myProjectsTab.nativeElement.classList.remove('selected');
    this.homeTab.nativeElement.classList.remove('selected');
    this.router.navigate(['home', 'vendor', 'profile']);
  }

  projectsClick() {
    this.profileTab.nativeElement.classList.remove('selected');
    this.myProjectsTab.nativeElement.classList.add('selected');
    this.homeTab.nativeElement.classList.remove('selected');
    this.router.navigate(['home', 'vendor', 'projects']);
  }

  signOutClick() {
    this.authService.signOut();
  }

  changeProject(project: VendorProject) {
    this.profileSelectedProject = project;
  }

  openProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
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
