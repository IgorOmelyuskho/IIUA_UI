import { Component } from '@angular/core';

import { AuthorizationService } from './services/auth/authorization.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthorizationService) {
    this.authService.init();
  }

  title = 'uanext';
}
