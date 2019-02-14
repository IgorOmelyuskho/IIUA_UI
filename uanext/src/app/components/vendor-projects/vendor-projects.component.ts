import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorCompanyService } from 'src/app/services/vendorCompany/vendor-company.service';
import { VendorCompany } from 'src/app/models';

@Component({
  selector: 'app-vendor-projects',
  templateUrl: './vendor-projects.component.html',
  styleUrls: ['./vendor-projects.component.scss']
})
export class VendorProjectsComponent implements OnInit {
  projects: VendorCompany[] = [];

  constructor(private router: Router, private vendorCompanyService: VendorCompanyService) { }

  ngOnInit() {
    this.vendorCompanyService.fetchVendorCompanies().subscribe(
      (vendorCompanies: VendorCompany[]) => {
        console.log(vendorCompanies);
        this.projects = vendorCompanies;
      },
      err => {
        console.warn(err);
      }
    );
  }

  createNewCompany() {
    this.router.navigate(['home', 'vendor', 'newProject']);
  }

  goToProject(project: VendorCompany) {
    this.vendorCompanyService.projectForUpdate = project;
    this.router.navigate(['home', 'vendor', 'project', project.id]);
  }

}
