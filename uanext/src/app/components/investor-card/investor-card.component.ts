import { Component, OnInit, Input } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';

@Component({
  selector: 'app-investor-card',
  templateUrl: './investor-card.component.html',
  styleUrls: ['./investor-card.component.scss']
})
export class InvestorCardComponent implements OnInit {
  @Input() project: VendorProject | any; // not VendorProject

  constructor() { }

  ngOnInit() {
  }

  getAvataraUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

}
