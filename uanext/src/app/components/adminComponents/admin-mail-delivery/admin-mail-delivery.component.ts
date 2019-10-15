import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-mail-delivery',
  templateUrl: './admin-mail-delivery.component.html',
  styleUrls: ['./admin-mail-delivery.component.scss']
})
export class AdminMailDeliveryComponent implements OnInit {
  emailList: any[] = [];
  newEmail = '';

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 50; i++) {
      this.emailList.push({
        email: 'some.email.gmail.com',
        sended: Math.random() > 0.5 ? true : false
      });
    }

    // tslint:disable-next-line:max-line-length
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IklJVUEgSEVMUCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjExMTExMTExLTIyMjItMzMzMy00NDQ0LTU1NTU1NTU1NTU1NSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTU3MTA2ODgyMSwiZXhwIjoxNTcxNjczNjIxLCJpYXQiOjE1NzEwNjg4MjF9.DOS1HNG7RvN8SxS_H19oAqL--F7XLTupNlZoDIvMf_k';
  }

  getAdmin() {
    const adminId = '11111111-2222-3333-4444-555555555555';
  }

  addAllNonAdded() {
  }

}
