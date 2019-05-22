import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/http/authorization.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit, AfterViewInit {
  @ViewChild('profile') profileTab: ElementRef;
  @ViewChild('upload') uploadTab: ElementRef;

  constructor(private router: Router, private authService: AuthorizationService) { }

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
    this.router.navigate(['admin', 'profile']);
  }

  uploadModel() {
    this.profileTab.nativeElement.classList.remove('selected');
    this.uploadTab.nativeElement.classList.add('selected');
    this.router.navigate(['admin', 'upload3dModel']);
  }

  signOut() {
    this.authService.signOut();
  }

}
