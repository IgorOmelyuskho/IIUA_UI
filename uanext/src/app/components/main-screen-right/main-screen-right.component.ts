import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main-screen-right',
  templateUrl: './main-screen-right.component.html',
  styleUrls: ['./main-screen-right.component.scss']
})
export class MainScreenRightComponent implements OnInit {
  @ViewChild('mainScreenRight') rightBlock: ElementRef;

  messages_show = false;
  notifications_show = false;
  iterative_investment_show = false;

  constructor() { }

  ngOnInit() {
    this.rightBlock.nativeElement.style.display = 'none';
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
  }

  showNotifications() {
    this.notifications_show = !this.notifications_show;
    this.rightBlock.nativeElement.style.display = '';
  }

  showIterativeInvestment() {
    this.iterative_investment_show = !this.iterative_investment_show;
    this.rightBlock.nativeElement.style.display = '';
  }
}
