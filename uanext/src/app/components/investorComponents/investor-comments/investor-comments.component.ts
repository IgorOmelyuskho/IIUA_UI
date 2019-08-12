import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { VendorProject } from 'src/app/models/vendorProject';
import * as autosize from 'autosize';
import { ChatService } from 'src/app/services/http/chat.service';
import { Chat } from 'src/app/models/chat/chat';

@Component({
  selector: 'app-investor-comments',
  templateUrl: './investor-comments.component.html',
  styleUrls: ['./investor-comments.component.scss']
})
export class InvestorCommentsComponent implements OnInit, OnDestroy {
  @Input() project: VendorProject;
  self = 'InvestorCommentsComponent';
  textareaSelector1 = '.comments .send-comment .textarea-wrapper textarea';
  textareaSelector2 = '.comments-wrapper .comment .answer .textarea-wrapper textarea';
  chat: Chat;

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

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    console.log(this.project);
    requestAnimationFrame(() => {
      autosize(document.querySelector(this.textareaSelector1));
      autosize(document.querySelectorAll(this.textareaSelector2));
    });

    this.chatService.getChatBProjectId(this.project.id).subscribe(
      (chat: Chat) => {
        this.chat = chat;
        console.log(this.chat);
      },
      err => {
        console.warn(err);
      }
    );
  }

  ngOnDestroy() {
    autosize.destroy(document.querySelector(this.textareaSelector1));
    autosize.destroy(document.querySelectorAll(this.textareaSelector2));
  }

}
