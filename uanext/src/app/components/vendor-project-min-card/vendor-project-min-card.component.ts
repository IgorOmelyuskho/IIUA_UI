import { Component, OnInit, Input } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';

@Component({
  selector: 'app-vendor-project-min-card',
  templateUrl: './vendor-project-min-card.component.html',
  styleUrls: ['./vendor-project-min-card.component.scss']
})
export class VendorProjectMinCardComponent implements OnInit {
  @Input() project: VendorProject;

  constructor() { }

  ngOnInit() {
  }

  getAvataraUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

}
