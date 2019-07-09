import { Component, OnInit, Renderer2, EventEmitter, ElementRef, ViewChild, Output, Input, AfterViewInit } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';

@Component({
  selector: 'app-vendor-project-card',
  templateUrl: './vendor-project-card.component.html',
  styleUrls: ['./vendor-project-card.component.scss']
})
export class VendorProjectCardComponent implements OnInit, AfterViewInit {
  @ViewChild('stepsElement') stepsElement: ElementRef;
  @Input() project: VendorProject;
  @Output() clickOnCardEvent = new EventEmitter<VendorProject>();

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.numberNotFitSteps();
  }

  numberNotFitSteps() {
    let notFit = 0;
    let stepInsertBefore = null;
    for (let i = 0; i < this.stepsElement.nativeElement.children.length; i++) {
      const elem = this.stepsElement.nativeElement.children[i];
      if (this.stepsElement.nativeElement.clientHeight < elem.offsetTop + elem.clientHeight) {
        notFit++;
        if (stepInsertBefore == null) {
          stepInsertBefore = elem;
        }
      }
    }

    if (notFit <= 0) {
      return;
    }

    if (stepInsertBefore == null) {
      return;
    }

    const newP = document.createElement('p');
    newP.innerText = '+' + notFit;
    this.renderer.addClass(newP, 'step');

    this.stepsElement.nativeElement.insertBefore(newP, stepInsertBefore);
  }

  getAvatarUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

  clickOnCard() {
    this.clickOnCardEvent.emit(this.project);
  }
}
