
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvestorRole } from 'src/app/models/investorRole';

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.scss']
})
export class InvestorComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  goToProfile() {
    this.router.navigate(['home', 'investor', 'profile']);
  }

}


