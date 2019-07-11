import { Component, OnInit, Input } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-investor-interactive-investment-card',
  templateUrl: './investor-interactive-investment-card.component.html',
  styleUrls: ['./investor-interactive-investment-card.component.scss']
})
export class InvestorInteractiveInvestmentCardComponent implements OnInit {
  project: VendorProject;
  self = 'InvestorInteractiveInvestmentCardComponent';

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.interactiveInvestmentProject$
    .subscribe(
      (project: VendorProject) => {
        this.project = project;
      }
    );
  }

  closeCard() {
    this.stateService.interactiveInvestmentProject$.next(null);
  }

  getAvataraUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

}
