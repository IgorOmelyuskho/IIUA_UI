import { Component, OnInit } from '@angular/core';
import { responseProjects } from '../../../helperClasses/projects';

@Component({
  selector: 'app-investor-iterative-investment',
  templateUrl: './investor-iterative-investment.component.html',
  styleUrls: ['./investor-iterative-investment.component.scss']
})
export class InvestorIterativeInvestmentComponent implements OnInit {
  projects: any[] = [...responseProjects.projectsList, ...responseProjects.projectsList];

  constructor() { }

  ngOnInit() {
  }

  getAvatarUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

}
