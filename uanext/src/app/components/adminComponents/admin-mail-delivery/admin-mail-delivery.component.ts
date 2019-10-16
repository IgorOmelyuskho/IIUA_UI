import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/http/notifications.service';

interface NotificationData {
  email: string;
  sended: boolean;
  id?: any;
}

@Component({
  selector: 'app-admin-mail-delivery',
  templateUrl: './admin-mail-delivery.component.html',
  styleUrls: ['./admin-mail-delivery.component.scss']
})
export class AdminMailDeliveryComponent implements OnInit {
  emailList: NotificationData[] = [];
  newEmail = '';
  readonly pageSize = 30;
  page = 1; // or 0

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.getList();

    // tslint:disable-next-line:max-line-length
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IklJVUEgSEVMUCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjExMTExMTExLTIyMjItMzMzMy00NDQ0LTU1NTU1NTU1NTU1NSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTU3MTA2ODgyMSwiZXhwIjoxNTcxNjczNjIxLCJpYXQiOjE1NzEwNjg4MjF9.DOS1HNG7RvN8SxS_H19oAqL--F7XLTupNlZoDIvMf_k';
  }

  getAdmin() {
    const adminId = '11111111-2222-3333-4444-555555555555';
  }

  sendForAll() {
    this.notificationsService.sendForAll().subscribe();
  }

  createNotification() {
    this.notificationsService.createNotification(this.newEmail).subscribe();
  }

  send(data: NotificationData) {
    this.notificationsService.sendForOne(data.id).subscribe();
  }

  remove(data: NotificationData) {
    this.notificationsService.removeNotification(data.id).subscribe();
  }

  onScroll() {
    this.getList();
    console.log('scroll');
  }

  getList() {
    this.notificationsService.getList(this.page, this.pageSize).subscribe(
      (val: NotificationData[]) => {
        this.emailList = this.emailList.concat(val);
      }
    );

    this.page++;
  }
}
