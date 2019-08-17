import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { Message } from '../models/chat/message';
import { testMessagePhoto } from '../helperClasses/messages';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatSignalRService {
  private hubConnection: HubConnection;
  private timeOut1: any;
  private counter = 0; // todo remove
  InvestorCommentsComponent$: ReplaySubject<Message> = new ReplaySubject(1);
  VendorMessagesComponent$: ReplaySubject<Message> = new ReplaySubject(1);

  constructor() { }

  signalRConnect() {
    // this.emulateSignalR();
    const token = localStorage.getItem('token');
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(
        environment.signalR,
        {
          accessTokenFactory: () => token
        })
      .build();

    this.hubConnection.on('MessageSBEvent', (message) => {
      const parsedMessage = JSON.parse(message);
      const replacedFields = this.replaceFieldsName(parsedMessage);
      this.InvestorCommentsComponent$.next(replacedFields);
      this.VendorMessagesComponent$.next(replacedFields);
    });

    this.hubConnection.start()
      .then(() => {
        console.log('chat SignalRConnect');
      })
      .catch((err) => {
        console.warn(err.toString());
        return;
      });
  }

  // signalRDisconnect() { // not use in child component - use in main component ?
  //   this.hubConnection.stop();
  //   clearInterval(this.timeOut1);
  // }

  private emulateSignalR() {
    this.timeOut1 = setInterval(() => {
      this.counter++;
      const message: Message = { ...testMessagePhoto };
      message.createdDate = new Date();
      message.text = this.counter.toString() + message.text;
      this.InvestorCommentsComponent$.next(message);
      this.VendorMessagesComponent$.next(message);
    }, 3500);
  }

  private replaceFieldsName(message: any): Message {
    const newMessage = {
      id: message.Id,
      text: message.Text,
      conversationId: message.ConversationId,
      participantId: message.ParticipantId,
      userId: message.UserId,
      attachmentId: message.AttachmentId,
      attachmentUrl: message.AttachmentUrl,
      attachmentOriginalName: message.AttachmentOriginalName,
      createdDate: new Date(message.CreatedDate),
      creator: message.Creator,
      lastUpdatedDate: message.LastUpdatedDate,
      leaveDate: message.LeaveDate
    };
    return newMessage;
  }
}
