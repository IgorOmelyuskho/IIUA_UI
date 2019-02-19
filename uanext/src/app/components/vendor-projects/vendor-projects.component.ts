import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorCompanyService } from 'src/app/services/vendorCompany/vendor-company.service';
import { VendorCompany } from 'src/app/models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-vendor-projects',
  templateUrl: './vendor-projects.component.html',
  styleUrls: ['./vendor-projects.component.scss']
})
export class VendorProjectsComponent implements OnInit {
  projects: VendorCompany[] = [];
  isLoaded = false;

  constructor(private router: Router, private vendorCompanyService: VendorCompanyService) { }

  ngOnInit() {
    this.isLoaded = false;
    this.vendorCompanyService.fetchVendorCompanies().subscribe(
      (vendorCompanies: VendorCompany[]) => {
        this.projects = vendorCompanies;
        this.isLoaded = true;
      },
      err => {
        console.warn(err);
        if (err.error.error.code === 2) {
          this.projects = [];
        }
        this.isLoaded = true;
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
