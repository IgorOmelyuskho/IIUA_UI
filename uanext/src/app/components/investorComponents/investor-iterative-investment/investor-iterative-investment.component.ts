import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { responseProjects } from '../../../helperClasses/projects';
import { VendorProject } from 'src/app/models/vendorProject';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-investor-iterative-investment',
  templateUrl: './investor-iterative-investment.component.html',
  styleUrls: ['./investor-iterative-investment.component.scss']
})
export class InvestorIterativeInvestmentComponent implements OnInit {
  projects: any[] = [...responseProjects.projectsList, ...responseProjects.projectsList];

  constructor(private stateService: StateService) { }

  ngOnInit() {
  }

  getAvatarUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

  showDetailedCard(project: VendorProject) {
    this.stateService.interactiveInvestmentProject$.next(project);
  }

}
