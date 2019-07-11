import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';

@Component({
  selector: 'app-filtered-project',
  templateUrl: './filtered-project.component.html',
  styleUrls: ['./filtered-project.component.scss']
})
export class FilteredProjectComponent implements OnInit, AfterViewInit {
  @Input() project: VendorProject;
  @Output() selectProject = new EventEmitter<VendorProject>();
  @Output() goToProject = new EventEmitter<VendorProject>();

  @Input() searchText = 'prev_search'; // need some default string

  @ViewChild('stepsElement') stepsElement: ElementRef;

  constructor(private renderer: Renderer2) { }

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

  getAvataraUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

  projectOnSelect() {
    this.selectProject.emit(this.project);
  }

  goToProjectClick() {
    this.goToProject.emit(this.project);
  }

}
