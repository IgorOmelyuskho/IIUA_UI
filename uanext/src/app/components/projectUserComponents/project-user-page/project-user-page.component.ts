import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/http/authorization.service';

@Component({
  selector: 'app-project-user-page',
  templateUrl: './project-user-page.component.html',
  styleUrls: ['./project-user-page.component.scss']
})
export class ProjectUserPageComponent implements OnInit {

  constructor(private router: Router, private authService: AuthorizationService) { }

  ngOnInit() {
  }

  goToProfile() {
    this.router.navigate(['projectUser', 'profile']);
  }

  signOut() {
    this.authService.signOut();
  }

}
