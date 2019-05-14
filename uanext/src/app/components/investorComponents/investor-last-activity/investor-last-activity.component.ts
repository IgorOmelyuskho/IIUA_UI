import { Component, OnInit } from '@angular/core';
import { responseProjects } from '../../../helperClasses/projects';

@Component({
  selector: 'app-investor-last-activity',
  templateUrl: './investor-last-activity.component.html',
  styleUrls: ['./investor-last-activity.component.scss']
})
export class InvestorLastActivityComponent implements OnInit {
  projects: any[] = [...responseProjects.projectsList, ...responseProjects.projectsList];

  constructor() { }

  ngOnInit() {
  }

  getAvatarUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

}
