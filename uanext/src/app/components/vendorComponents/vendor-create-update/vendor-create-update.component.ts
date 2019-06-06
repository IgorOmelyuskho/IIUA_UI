import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';

@Component({
  selector: 'app-vendor-create-update',
  templateUrl: './vendor-create-update.component.html',
  styleUrls: ['./vendor-create-update.component.scss']
})
export class VendorCreateUpdateComponent implements OnInit, AfterViewInit {
  @Input()
  set selectedProject(project: VendorProject) {
    if (project != null) {
      this.projectSteps = [...project.steps];

      for (let i = 0; i < this.projectSteps.length; i++) {
        this.projectSteps[i].selected = false;
      }
    }
  }


  @ViewChild('dropArea') dropArea: ElementRef;
  @ViewChild('gallery') gallery: ElementRef;
  // @ViewChild('progressBar') progressBar: ElementRef;

  projectSteps: any[] = [];
  tieSteps: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.dropArea.nativeElement.addEventListener(eventName, this.preventDefaults.bind(this), false);
      document.body.addEventListener(eventName, this.preventDefaults.bind(this), false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      this.dropArea.nativeElement.addEventListener(eventName, this.highlight.bind(this), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      this.dropArea.nativeElement.addEventListener(eventName, this.unhighlight.bind(this), false);
    });

    this.dropArea.nativeElement.addEventListener('drop', this.handleDrop.bind(this), false);
  }

  tieToStep(step: any) {
    this.tieSteps = [];
    step.selected = !step.selected;

    for (let i = 0; i < this.projectSteps.length; i++) {
      if (this.projectSteps[i].selected === true) {
        this.tieSteps.push(this.projectSteps[i]);
      }
    }
    console.log(this.tieSteps);
  }

  preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  highlight(e) {
    this.dropArea.nativeElement.classList.add('highlight');
  }

  unhighlight(e) {
    this.dropArea.nativeElement.classList.remove('active');
  }

  handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    this.handleFiles(files);
  }

  // initializeProgress(numFiles) {
  //   this.progressBar.value = 0;
  //   this.uploadProgress = [];

  //   for (let i = numFiles; i > 0; i--) {
  //     this.uploadProgress.push(0);
  //   }
  // }

  // updateProgress(fileNumber, percent) {
  //   this.uploadProgress[fileNumber] = percent;
  //   const total = this.uploadProgress.reduce((tot, curr) => tot + curr, 0) / this.uploadProgress.length;
  //   this.progressBar.value = total;
  // }

  handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      this.uploadFile(files[i], i);
      this.previewFile(files[i]);
    }
    // this.initializeProgress(files.length);
  }

  previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      img.src = reader.result as string;
      figure.appendChild(img);
      this.gallery.nativeElement.appendChild(figure);
    };
  }

  uploadFile(file, i) {
    const url = 'https://api.cloudinary.com/v1_1/joezimim007/image/upload';
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    // Update progress (can be used to show progress indicator)
    // xhr.upload.addEventListener('progress', (e) => {
    //   this.updateProgress(i, (e.loaded * 100.0 / e.total) || 100);
    // });

    // xhr.addEventListener('readystatechange', (e) => {
    //   if (xhr.readyState === 4 && xhr.status === 200) {
    //     this.updateProgress(i, 100); // <- Add this
    //   } else if (xhr.readyState === 4 && xhr.status !== 200) {
    //     // Error. Inform the user
    //   }
    // });

    formData.append('upload_preset', 'ujpu6gyk');
    formData.append('file', file);
    xhr.send(formData);
  }

  send() {
    console.log('SEND-2');
  }
}
