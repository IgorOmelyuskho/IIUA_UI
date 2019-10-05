import { Component, OnInit, Renderer2, EventEmitter, ElementRef, ViewChild, Output, Input, AfterViewInit } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import { StateService } from 'src/app/services/state/state.service';
import { ProjectsService } from 'src/app/services/http/projects.service';

@Component({
  selector: 'app-vendor-project-card',
  templateUrl: './vendor-project-card.component.html',
  styleUrls: ['./vendor-project-card.component.scss']
})
export class VendorProjectCardComponent implements OnInit, AfterViewInit {
  @ViewChild('stepsElement') stepsElement: ElementRef;
  @Input() project: VendorProject;
  @Output() clickOnCardEvent = new EventEmitter<VendorProject>();
  @Output() removeCardEvent = new EventEmitter<VendorProject>();

  constructor(private renderer: Renderer2, private stateService: StateService, private projectsService: ProjectsService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.numberNotFitSteps();
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

  getAvataraUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

  clickOnCard() {
    if (this.stateService.cardClickEnabled === false) {
      this.stateService.cardClickEnabled = true;
      return;
    }
    this.clickOnCardEvent.emit(this.project);
  }

  removeProject(event) {
    event.stopPropagation();
    this.projectsService.removeProjectById(this.project.id).subscribe();
    this.removeCardEvent.emit(this.project);
  }
}
