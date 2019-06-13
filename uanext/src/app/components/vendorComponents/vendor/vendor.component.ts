import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit, OnDestroy  {
  heightStyle = '100%';
  subscription: Subscription;

  constructor(private router: Router) { }

  ngOnInit() {
    // fix bug when page init with some height and later change height
    this.subscription = this.router.events.subscribe(
      (val => {
        if (val['url'] === '/home/vendor/main-page') {
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
