import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  hubConnection: HubConnection;
  receiveMessageCallback: Function;

  // todo - remove (use for emulate signalR)
  timeOut1: any;
  objectsArr: any[] = [
    {
      object3DId: '0',
      positionX: 13.417122340477,
      positionY: 52.5281344784827
    },
    {
      object3DId: '1',
      positionX: 13.417222340477,
      positionY: 52.5282344784827
    },
    {
      object3DId: '2',
      positionX: 13.417322340477,
      positionY: 52.5283344784827
    },
    {
      object3DId: '3',
      positionX: 13.417422340477,
      positionY: 52.5284344784827
    },
    {
      object3DId: '4',
      positionX: 13.417522340477,
      positionY: 52.5281444184827
    }
  ];

  constructor() { }

  signalRConnect(cb: Function) { // todo dispose
    this.receiveMessageCallback = cb;
    this.emulateSignalR();
    // const token = localStorage.getItem('token');
    // this.hubConnection = new HubConnectionBuilder()
    //   .withUrl(
    //     environment.signalR,
    //     {
    //       accessTokenFactory: () => token // Bearer ?
    //     })
    //   .build();

    // this.hubConnection.on('HistoryPositionSBEvent', function (message) {
    // //   // console.log(message);
    // //   // if (this.receiveMessageCallback != null) {
    // //   //   this.receiveMessageCallback(message);
    // //   // }
    // // });

    // // todo remove ?
    // this.hubConnection.start()
    //   .then(function () {
    //     console.log('START');
    //   })
    //   .catch(function (err) {
    //     console.error(err.toString());
    //     return;
    //   });
  }

  // remove
  // signalRSendMsg() {
  //   this.hubConnection.invoke('SendMessage')
  //     .catch(function (err) {
  //       console.error(err.toString());
  //       return;
  //     });
  // }

  signalRDisconnect() {
    // this.hubConnection.stop();
    clearInterval(this.timeOut1);
  }

  emulateSignalR() {
    this.timeOut1 = setInterval(() => {
      for (let i = 0; i < this.objectsArr.length; i++) {
        this.objectsArr[i].positionX = this.objectsArr[i].positionX + Math.random() * 0.001 - Math.random() * 0.001;
        this.objectsArr[i].positionY = this.objectsArr[i].positionY + Math.random() * 0.001 - Math.random() * 0.001;

        const message: { object3DId: string, positionX: number, positionY: number } = {
          object3DId: this.objectsArr[i].object3DId,
          positionX: this.objectsArr[i].positionX,
          positionY: this.objectsArr[i].positionY
        };

        if (this.receiveMessageCallback != null) {
          this.receiveMessageCallback(message);
        }
      }
    }, 3500);
  }
}
