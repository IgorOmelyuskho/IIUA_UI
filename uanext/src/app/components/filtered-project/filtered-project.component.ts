import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { ViewVendorProject } from 'src/app/models/viewVendorProject';

@Component({
  selector: 'app-filtered-project',
  templateUrl: './filtered-project.component.html',
  styleUrls: ['./filtered-project.component.scss']
})
export class FilteredProjectComponent implements OnInit, AfterViewInit {
  @Input() project: ViewVendorProject;
  @Output() selectProject = new EventEmitter<ViewVendorProject>();

  @ViewChild('stepsElement')
  private stepsElement: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.numberNotFitSteps();
  }

  numberNotFitSteps(): number {
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
    return 'url("' +  url + '")';
  }

  projectOnSelect() {
    this.selectProject.emit(this.project);
  }

}
