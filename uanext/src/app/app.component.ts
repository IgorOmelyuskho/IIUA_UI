import { Component } from '@angular/core';

import { AuthorizationService } from './services/http/authorization.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthorizationService, private router: Router) {
    // this.authService.init(); // todo
  }

  title = 'uanext';
}
