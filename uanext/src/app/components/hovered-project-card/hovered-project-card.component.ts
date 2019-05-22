import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-hovered-project-card',
  templateUrl: './hovered-project-card.component.html',
  styleUrls: ['./hovered-project-card.component.scss']
})
export class HoveredProjectCardComponent implements OnInit, AfterViewInit {
  @ViewChild('stepsElement') stepsElement: ElementRef;
  project: any;

  @Input()
  set hoveredProject(project: any) { // project id
    this.fetchProject(project);
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
    setTimeout(() => {
      this.project = project;
      this.projectUploaded = true;
      requestAnimationFrame(() => {
        this.numberNotFitSteps();
      });
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

  getAvatarUrl(project) {
    const url = project.avatara.url;
    return 'url("' + url + '")';
  }

}
