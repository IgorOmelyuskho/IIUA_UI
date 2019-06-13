import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.scss']
})
export class InvestorComponent implements OnInit, OnDestroy {
  heightStyle = '100%';
  subscription: Subscription;

  constructor(private router: Router) { }

  ngOnInit() {
    // fix bug when page init with some height and later change height
    this.subscription = this.router.events.subscribe(
      (val => {
        if (val['url'] === '/home/investor/main-page') {
          this.heightStyle = '100vh';
        } else {
          this.heightStyle = '100%';
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


