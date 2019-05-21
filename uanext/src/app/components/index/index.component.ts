import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  @ViewChild('video') videoElement: ElementRef;
  @ViewChild('play') playElement: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  playVideo() {
    this.videoElement.nativeElement.play();
    this.playElement.nativeElement.style.display = 'none';
  }

  stopVideo() {
    this.videoElement.nativeElement.pause();
    this.playElement.nativeElement.style.display = '';
  }

}
