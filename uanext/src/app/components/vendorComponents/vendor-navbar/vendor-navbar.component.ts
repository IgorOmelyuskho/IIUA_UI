import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/http/authorization.service';
import { VendorProject } from 'src/app/models/vendorProject';
import { responseProject, responseProject2 } from '../../../helperClasses/projects';
import { TranslateService } from 'src/app/services/translate.service';
import { ProjectsService } from 'src/app/services/http/projects.service';
import { StateService } from 'src/app/services/state/state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vendor-navbar',
  templateUrl: './vendor-navbar.component.html',
  styleUrls: ['./vendor-navbar.component.scss']
})
export class VendorNavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('home') homeTab: ElementRef;
  @ViewChild('profile') profileTab: ElementRef;
  @ViewChild('myProjects') myProjectsTab: ElementRef;
  self = 'VendorNavbarComponent';
  mediaQueryString = 'screen and (max-width: 760px)'; // also used in .scss
  mq = window.matchMedia(this.mediaQueryString);
  matchesMediaQuery = false;
  menuIsOpen = false;

  projects: VendorProject[];

  profileSelectedProject: VendorProject;
  selectedProjectSubscription: Subscription;
  profileMenuOpen = false;
  showProfileProgress = false;

  constructor(
    private router: Router,
    private authService: AuthorizationService,
    public translateService: TranslateService,
    private projectsService: ProjectsService,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.initMenu();
    this.mq.addListener(this.matchMediaHandler);

    this.selectedProjectSubscription = this.stateService.selectedVendorProject$.subscribe(
      (val: VendorProject) => {
        this.profileSelectedProject = val;
      },
      err => {
        console.warn(err);
      }
    );
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
    this.router.navigate(['signin']);
  }

  changeProject(project: VendorProject) {
    this.stateService.selectedVendorProject$.next(project);
    this.profileMenuOpen = false;
  }

  openProfileMenu() {
    if (this.profileMenuOpen === true) {
      this.profileMenuOpen = false;
      return;
    }

    this.showProfileProgress = true;
    this.projectsService.fetchVendorProjects().subscribe(
      (val: VendorProject[]) => {
        this.profileMenuOpen = true;
        this.projects = val.sort((a: VendorProject, b: VendorProject) => {
          if (a.queuePosition < b.queuePosition) {
            return -1;
          }
          if (a.queuePosition > b.queuePosition) {
            return 1;
          }
          return 0;
        });
        this.showProfileProgress = false;
      },
      err => {
        console.warn(err);
        this.profileMenuOpen = true;
        this.showProfileProgress = false;
      }
    );
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
    this.selectedProjectSubscription.unsubscribe();
  }
}
