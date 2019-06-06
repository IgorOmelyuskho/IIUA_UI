import { Component } from '@angular/core';

import { AuthorizationService } from './services/http/authorization.service';
import { Router } from '@angular/router';

// declare const slidePage;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthorizationService, private router: Router) {
    // const slide = new slidePage();
    this.authService.init();
  }

  title = 'uanext';
}
