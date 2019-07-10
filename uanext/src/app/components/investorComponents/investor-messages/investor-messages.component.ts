import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investor-messages',
  templateUrl: './investor-messages.component.html',
  styleUrls: ['./investor-messages.component.scss']
})
export class InvestorMessagesComponent implements OnInit {
  self = 'InvestorMessagesComponent';
  messages: any[] = [
    {
      avatara: 'https://www.shareicon.net/data/128x128/2015/09/24/106428_man_512x512.png',
      type: 'their',
      sender: 'Sender Name',
      text: 'Far from the countries Vokalia and Consoia, texts Far from the countries Vokalia and Consoia, texts',
      attachments: null,
      time: '12:03'
    },
    {
      avatara: 'https://www.shareicon.net/data/128x128/2015/09/24/106428_man_512x512.png',
      type: 'their',
      sender: 'Sender Name',
      text: 'Far from the countries Vokalia and Consoexts',
      attachments: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm1DKrUQDVaNcJ6xSXK5XwLDSliIJ_LLaWgMdgf-pMNsulcpJe7A',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm1DKrUQDVaNcJ6xSXK5XwLDSliIJ_LLaWgMdgf-pMNsulcpJe7A',
      ],
      time: '12:03'
    },
    {
      type: 'date',
      date: 'Ср 24 Апрель'
    },
    {
      type: 'you',
      text: 'There live the blind',
      attachments: null,
      time: '12:03'
    },
    {
      type: 'you',
      text: 'There live the blind',
      attachments: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm1DKrUQDVaNcJ6xSXK5XwLDSliIJ_LLaWgMdgf-pMNsulcpJe7A',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm1DKrUQDVaNcJ6xSXK5XwLDSliIJ_LLaWgMdgf-pMNsulcpJe7A',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm1DKrUQDVaNcJ6xSXK5XwLDSliIJ_LLaWgMdgf-pMNsulcpJe7A',
      ],
      time: '12:03'
    },
    {
      type: 'you',
      text: 'There live the blind There live the blind There live the blind There live the blindThere live the blind There live the blind',
      attachments: null,
      time: '12:03'
    },
    {
      type: 'date',
      date: 'Ср 24 Апрель'
    },
    {
      avatara: 'https://www.shareicon.net/data/128x128/2015/09/24/106428_man_512x512.png',
      type: 'their',
      sender: 'Sender Name',
      text: 'Far from the countries Vokalia and Consoexts',
      attachments: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm1DKrUQDVaNcJ6xSXK5XwLDSliIJ_LLaWgMdgf-pMNsulcpJe7A',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm1DKrUQDVaNcJ6xSXK5XwLDSliIJ_LLaWgMdgf-pMNsulcpJe7A',
      ],
      time: '12:03'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  getImageUrl(url) {
    // const url = project.avatara.url;
    return 'url("' + url + '")';
  }

}
