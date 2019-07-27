import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { FilteredProjectsService } from './http/filtered-projects.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  hubConnection: HubConnection;
  receiveMessageCallback: Function;

  // todo - remove (use for emulate signalR)
  timeOut1: any;
  objectsArr: { object3DId: string, positionX: number, positionY: number, canMove: boolean }[] = [];

  constructor(private filteredProjectsService: FilteredProjectsService) { }

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
      this.objectsArr = [];
      for (let i = 0; i < this.filteredProjectsService.mockGeoObjectArr.length; i++) {
        for (let j = 0; j < this.filteredProjectsService.mockGeoObjectArr[i].TEST_3D_Objects_Arr.length; j++) {
          this.objectsArr.push({
            object3DId: this.filteredProjectsService.mockGeoObjectArr[i].TEST_3D_Objects_Arr[j].geoObjectId,
            positionX: this.filteredProjectsService.mockGeoObjectArr[i].TEST_3D_Objects_Arr[j].coords.x,
            positionY: this.filteredProjectsService.mockGeoObjectArr[i].TEST_3D_Objects_Arr[j].coords.y,
            canMove: this.filteredProjectsService.mockGeoObjectArr[i].TEST_3D_Objects_Arr[j].canMove
          });
        }
      }

      for (let i = 0; i < this.objectsArr.length; i++) {
        if (this.objectsArr[i].canMove === false) {
          continue;
        }
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
