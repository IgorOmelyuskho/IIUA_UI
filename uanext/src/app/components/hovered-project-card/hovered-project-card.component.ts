import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';

@Component({
  selector: 'app-hovered-project-card',
  templateUrl: './hovered-project-card.component.html',
  styleUrls: ['./hovered-project-card.component.scss']
})
export class HoveredProjectCardComponent implements OnInit, AfterViewInit {
  @ViewChild('stepsElement') stepsElement: ElementRef;
  project: VendorProject;
  @Output() clickOnCardEvent = new EventEmitter<VendorProject>();
  @Input()
  set hoveredProject(project: VendorProject) { // project id
    if (project != null) {
      this.fetchProject(project);
    }
  }

  projectUploaded = false;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  fetchProject(project) {  // project id
    this.projectUploaded = false;
    setTimeout(() => { // emulate delay http query for fetch project
      this.project = project;
      this.projectUploaded = true;
      // requestAnimationFrame(() => {
      //   this.numberNotFitSteps();
      // });
    }, 10);
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

  clickOnCard(project: VendorProject) {
    this.clickOnCardEvent.emit(project);
  }

}
