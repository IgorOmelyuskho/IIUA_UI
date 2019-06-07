import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userRole: string;

  constructor(private router: Router, private translateService: TranslateService) { }

  ngOnInit() {
  }

  ru() {
    this.translateService.use('ru').then(() => {});
  }

  en() {
    this.translateService.use('en').then(() => {});
  }

  signIn() {
    this.router.navigate(['signin']);
  }

  signUp() {
    this.router.navigate(['signup']);
  }
}
