import { Component, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }
}
