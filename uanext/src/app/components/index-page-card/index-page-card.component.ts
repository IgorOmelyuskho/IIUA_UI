import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';

@Component({
  selector: 'app-index-page-card',
  templateUrl: './index-page-card.component.html',
  styleUrls: ['./index-page-card.component.scss']
})
export class IndexPageCardComponent implements OnInit, AfterViewInit {
  // @ViewChild('stepsElement') stepsElement: ElementRef;
  @Input() project: VendorProject;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.numberNotFitSteps();
  }

  // numberNotFitSteps() {
  //   let notFit = 0;
  //   let stepInsertBefore = null;
  //   for (let i = 0; i < this.stepsElement.nativeElement.children.length; i++) {
  //     const elem = this.stepsElement.nativeElement.children[i];
  //     if (this.stepsElement.nativeElement.clientHeight < elem.offsetTop + elem.clientHeight) {
  //       notFit++;
  //       if (stepInsertBefore == null) {
  //         stepInsertBefore = elem;
  //       }
  //     }
  //   }

  //   if (notFit <= 0) {
  //     return;
  //   }

  //   if (stepInsertBefore == null) {
  //     return;
  //   }

  //   const newP = document.createElement('p');
  //   newP.innerText = '+' + notFit;
  //   this.renderer.addClass(newP, 'step');

  //   this.stepsElement.nativeElement.insertBefore(newP, stepInsertBefore);
  // }

  getAvataraUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }
}
