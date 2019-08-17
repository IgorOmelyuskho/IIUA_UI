import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';

@Component({
  selector: 'app-vendor-project-min-card',
  templateUrl: './vendor-project-min-card.component.html',
  styleUrls: ['./vendor-project-min-card.component.scss']
})
export class VendorProjectMinCardComponent implements OnInit {
  @Input() project: VendorProject;
  @Input() isSelect: boolean;
  @Output() selectEvent = new EventEmitter<VendorProject>();

  constructor() { }

  ngOnInit() {
  }

  getAvataraUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

  projectWrapperClick(project: VendorProject) {
    this.selectEvent.emit(project);
  }

}
