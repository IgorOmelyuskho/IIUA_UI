import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';

@Component({
  selector: 'app-main-screen-right',
  templateUrl: './main-screen-right.component.html',
  styleUrls: ['./main-screen-right.component.scss']
})
export class MainScreenRightComponent implements OnInit, OnDestroy {
  @ViewChild('mainScreenRight') rightBlock: ElementRef;

  messages_show = false;
  notifications_show = false;
  iterative_investment_show = false;
  detailedProjectCard: VendorProject;
  mq = window.matchMedia('screen and (max-width: 1450px)'); // also used in .scss
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
      this.notifications_show = false;
      this.iterative_investment_show = false;
    } else if (this.matchesMediaQuery === true && this.notifications_show === true && this.notifications_show === true) {
      this.notifications_show = false;
    }
  }

  hideRightBlock() {
    this.rightBlock.nativeElement.style.display = 'none';
    this.messages_show = false;
    this.notifications_show = false;
    this.iterative_investment_show = false;
  }

  showMessages() {
    this.messages_show = !this.messages_show;
    this.rightBlock.nativeElement.style.display = '';

    if (this.matchesMediaQuery === true) {
      this.notifications_show = false;
      this.iterative_investment_show = false;
    }

    if (this.messages_show === false && this.notifications_show === false && this.iterative_investment_show === false) {
      this.hideRightBlock();
    }
  }

  showNotifications() {
    this.notifications_show = !this.notifications_show;
    this.rightBlock.nativeElement.style.display = '';

    if (this.matchesMediaQuery === true) {
      this.messages_show = false;
      this.iterative_investment_show = false;
    }

    if (this.messages_show === false && this.notifications_show === false && this.iterative_investment_show === false) {
      this.hideRightBlock();
    }
  }

  showIterativeInvestment() {
    this.iterative_investment_show = !this.iterative_investment_show;
    this.rightBlock.nativeElement.style.display = '';

    if (this.matchesMediaQuery === true) {
      this.messages_show = false;
      this.notifications_show = false;
    }

    if (this.messages_show === false && this.notifications_show === false && this.iterative_investment_show === false) {
      this.hideRightBlock();
    }
  }

  ngOnDestroy() {
    this.mq.removeListener(this.matchMediaHandler);
  }
}
