import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-interactive-investment-min-card',
  templateUrl: './interactive-investment-min-card.component.html',
  styleUrls: ['./interactive-investment-min-card.component.scss']
})
export class InteractiveInvestmentMinCardComponent implements OnInit, AfterViewInit {
  @Input() project: VendorProject;
  @ViewChild('imagesWrapper') imagesWrapper: ElementRef;
  self = 'InteractiveInvestmentMinCardComponent';

  constructor(private renderer: Renderer2, private stateService: StateService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.numberNotFitSteps();
  }

  numberNotFitSteps() {
    let notFit = 0;
    let stepInsertBefore = null;
    for (let i = 0; i < this.imagesWrapper.nativeElement.children.length; i++) {
      const elem = this.imagesWrapper.nativeElement.children[i];
      if (this.imagesWrapper.nativeElement.clientWidth < elem.offsetLeft + elem.clientWidth) {
        notFit++;
        if (stepInsertBefore == null) {
          stepInsertBefore = this.imagesWrapper.nativeElement.children[i - 1];
        }
      }
    }

    if (notFit <= 0) {
      return;
    }

    if (stepInsertBefore == null) {
      return;
    }

    const newDiv = document.createElement('div');
    newDiv.innerText = '+' + (notFit + 1);
    this.renderer.addClass(newDiv, 'not-fit-count');

    this.imagesWrapper.nativeElement.insertBefore(newDiv, stepInsertBefore);
  }

  getAvatarUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

  showDetailedCard(project: VendorProject) {
    this.stateService.interactiveInvestmentProject$.next(project);
  }
}
