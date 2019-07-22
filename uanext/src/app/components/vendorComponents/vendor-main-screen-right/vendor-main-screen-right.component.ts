import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { responseProject2 } from 'src/app/helperClasses/projects';

@Component({
  selector: 'app-vendor-main-screen-right',
  templateUrl: './vendor-main-screen-right.component.html',
  styleUrls: ['./vendor-main-screen-right.component.scss']
})
export class VendorMainScreenRightComponent implements OnInit, OnDestroy {
  @ViewChild('mainScreenRight') rightBlock: ElementRef;
  find_investor_show = false;
  messages_show = false;
  investment_offer_show = false;
  mq = window.matchMedia('screen and (max-width: 1250px)'); // also used in .scss
  matchesMediaQuery = false;

  constructor() { }

  ngOnInit() {
    this.rightBlock.nativeElement.style.display = 'none';
    this.matchesMediaQuery = this.mq.matches;
    this.mq.addListener(this.matchMediaHandler);
  }

  matchMediaHandler = (data) => {
    this.matchesMediaQuery = data.matches;
    if (this.matchesMediaQuery === true && this.messages_show === true) {
      this.investment_offer_show = false;
    }
  }

  hideRightBlock() {
    this.rightBlock.nativeElement.style.display = 'none';
    this.find_investor_show = false;
    this.messages_show = false;
    this.investment_offer_show = false;
  }

  showMessages() {
    this.find_investor_show = !this.find_investor_show;
    this.messages_show = !this.messages_show;
    this.rightBlock.nativeElement.style.display = '';

    if (this.matchesMediaQuery === true) {
      this.investment_offer_show = false;
    }

    if (this.find_investor_show === false && this.messages_show === false && this.investment_offer_show === false) {
      this.rightBlock.nativeElement.style.display = 'none';
    }
  }

  showInvestmentOffer() {
    this.investment_offer_show = !this.investment_offer_show;
    this.rightBlock.nativeElement.style.display = '';

    if (this.matchesMediaQuery === true) {
      this.find_investor_show = false;
      this.messages_show = false;
    }

    if (this.find_investor_show === false && this.messages_show === false && this.investment_offer_show === false) {
      this.rightBlock.nativeElement.style.display = 'none';
    }
  }

  ngOnDestroy() {
    this.mq.removeListener(this.matchMediaHandler);
  }
}
