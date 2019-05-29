import { Component, OnInit } from '@angular/core';
import { responseProjects } from 'src/app/helperClasses/projects';

@Component({
  selector: 'app-vendor-find-investor',
  templateUrl: './vendor-find-investor.component.html',
  styleUrls: ['./vendor-find-investor.component.scss']
})
export class VendorFindInvestorComponent implements OnInit {
  projects: any[] = [...responseProjects.projectsList, ...responseProjects.projectsList];

  selected = 'all'; // investor/vendor

  constructor() {
    for (let i = 0; i < this.projects.length; i++) {
      if (i % 2 === 0) {
        this.projects[i].owner = 'Investor';
      } else {
        this.projects[i].owner = 'Vendor';
      }
    }
  }

  ngOnInit() {
  }

  getAvatarUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

  all() {
    this.selected = 'all';
  }

  investor() {
    this.selected = 'investor';
  }

  vendor() {
    this.selected = 'vendor';
  }
}
