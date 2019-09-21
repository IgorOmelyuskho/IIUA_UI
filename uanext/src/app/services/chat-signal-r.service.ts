import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HttpTransportType, LogLevel } from '@aspnet/signalr';
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
  messageReceived$: ReplaySubject<Message> = new ReplaySubject(1);

  constructor() { }

  signalRConnect() {
    // this.emulateSignalR();
    const token = localStorage.getItem('token');

    const options = { accessTokenFactory: () => token, transport: HttpTransportType.WebSockets, skipNegotiation: true };

    this.hubConnection = new HubConnectionBuilder()
      .configureLogging(LogLevel.Debug)
      .withUrl(environment.signalR, options)
      .build();

    this.hubConnection.serverTimeoutInMilliseconds = 1000 * 60 * 5000000; // 5000000 minute

    this.hubConnection.on('MessageSBEvent', (message) => {
      const parsedMessage = JSON.parse(message);
      const msg: Message = this.replaceFieldsName(parsedMessage);
      console.log('MESSAGE = ', msg);
      this.messageReceived$.next(msg);
    });

    this.connectionStart();

    this.hubConnection.onclose((err) => {
      this.connectionStart();
    });
  }

  connectionStart() {
    this.hubConnection.start()
      .then(() => {
        console.log('Chat SignalR start');
      })
      .catch((err) => {
        console.warn(err);
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
      this.messageReceived$.next(message);
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
