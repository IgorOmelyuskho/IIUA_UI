import { Component, OnInit } from '@angular/core';
import { responseProjects } from '../../../helperClasses/projects';
import { VendorProject } from 'src/app/models/vendorProject';
import { FilteredProjectsService } from 'src/app/services/http/filtered-projects.service';
import { FilteredProjects } from 'src/app/models';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-investor-chat-cards',
  templateUrl: './investor-chat-cards.component.html',
  styleUrls: ['./investor-chat-cards.component.scss']
})
export class InvestorLastActivityComponent implements OnInit {
  ngOnInit() {
  }
}
