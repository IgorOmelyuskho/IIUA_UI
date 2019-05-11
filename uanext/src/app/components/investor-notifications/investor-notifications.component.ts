import { Component, OnInit } from '@angular/core';
import { responseProjects } from '../../services/helperServices/projects';

@Component({
  selector: 'app-investor-notifications',
  templateUrl: './investor-notifications.component.html',
  styleUrls: ['./investor-notifications.component.scss']
})
export class InvestorNotificationsComponent implements OnInit {
  projects: any[] = [...responseProjects.data.projectsList, ...responseProjects.data.projectsList];

  constructor() { }

  ngOnInit() {
  }

  getAvatarUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

}
