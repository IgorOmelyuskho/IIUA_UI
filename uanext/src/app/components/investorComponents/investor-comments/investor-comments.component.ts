import { Component, OnInit, Input } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';

@Component({
  selector: 'app-investor-comments',
  templateUrl: './investor-comments.component.html',
  styleUrls: ['./investor-comments.component.scss']
})
export class InvestorCommentsComponent implements OnInit {
  @Input() project: VendorProject;
  comments = [
    {
      type: 'their',
      text: 'Et consequatur fuga quo odit reprehenderit deserunt magni. ' +
      ' Magni et vero saepe magni quas non laboriosam quia dolorum. Praesentium rerum illum deserunt pariatur vero non culpa iste',
      date: '23 Апр 2019'
    },
    {
      type: 'their',
      text: 'Et consequatur fuga quo odit.',
      date: '23 Апр 2019'
    },
    {
      type: 'their',
      text: 'Et consequatur fuga quo odit reprehenderit deserunt magni. ' +
      ' Magni et vero saepe magni quas non laboriosam quia dolorum. Praesentium rerum illum deserunt pariatur vero non culpa iste',
      date: '23 Апр 2019'
    },
    {
      type: 'you',
      text: 'Et consequatur fuga quo odit.',
      date: '23 Апр 2019'
    },
    {
      type: 'you',
      text: 'Et consequatur fuga quo odit reprehenderit deserunt magni. ' +
      ' Magni et vero saepe magni quas non laboriosam quia dolorum. Praesentium rerum illum deserunt pariatur vero non culpa iste',
      date: '23 Апр 2019'
    },
    {
      type: 'their',
      text: 'Et consequatur fuga quo odit reprehenderit deserunt magni. ' +
      ' Magni et vero saepe magni quas non laboriosam quia dolorum. Praesentium rerum illum deserunt pariatur vero non culpa iste',
      date: '23 Апр 2019'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
