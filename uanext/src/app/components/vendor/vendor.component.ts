import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToProfile() {
    this.router.navigate(['home', 'vendor', 'profile']);
  }

}
