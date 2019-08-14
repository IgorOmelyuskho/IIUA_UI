import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { Message } from '../models/chat/message';
import { testMessagePhoto } from '../helperClasses/messages';

@Injectable({
  providedIn: 'root'
})
export class ChatSignalRService {
  private hubConnection: HubConnection;
  receiveMessageCallback: Function;
  private timeOut1: any;
  private counter = 0; // todo remove

  constructor() { }

  signalRConnect(cb: Function) { // todo dispose
    this.receiveMessageCallback = cb;
    // this.emulateSignalR();
    const token = localStorage.getItem('token');
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(
        environment.signalR,
        {
          accessTokenFactory: () => token
        })
      .build();

    this.hubConnection.on('MessageSBEvent', function (message) {
      console.log(message);
      if (this.receiveMessageCallback != null) {
        this.receiveMessageCallback(message);
      }
    });

    // todo remove ?
    this.hubConnection.start()
      .then(function () {
        console.log('chat SignalRConnect START');
      })
      .catch(function (err) {
        console.error(err.toString());
        return;
      });
  }

  signalRDisconnect() {
    this.hubConnection.stop();
    clearInterval(this.timeOut1);
  }

  emulateSignalR() {
    this.timeOut1 = setInterval(() => {
      this.counter++;
      const message: Message = {...testMessagePhoto};
      message.createdDate = new Date();
      message.text = this.counter.toString() + message.text;
      if (this.receiveMessageCallback != null) {
        this.receiveMessageCallback(message);
      }
    }, 3500);
  }
}
