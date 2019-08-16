import { Component } from '@angular/core';

import { AuthorizationService } from './services/http/authorization.service';
import { Router } from '@angular/router';
import { ChatSignalRService } from './services/chat-signal-r.service';

// declare const slidePage;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public authService: AuthorizationService, private router: Router, private chatSignalR: ChatSignalRService) {
    this.authService.init(); // todo uncomment
    this.chatSignalR.signalRConnect();
  }

  title = 'uanext';
}
