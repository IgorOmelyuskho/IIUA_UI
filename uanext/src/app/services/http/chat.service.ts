import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GetOrCreateChatResponse } from 'src/app/models/chat/getOrCreateChatResponse';
import { Message } from 'src/app/models/chat/message';
import { testMessagePhoto, testMessageFile, testMessageVideo } from 'src/app/helperClasses/messages';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  counter = 0; // todo remove

  constructor(private http: HttpClient) { }

  getOrCreateP2P(userId: string): Observable<GetOrCreateChatResponse> { // userId - которому хотим написать
    return this.http.get<any>(environment.chat + environment.getOrCreateChat + userId);
  }

  createMessage(message: Message): Observable<Message> {
    // return this.http.post<any>(environment.chat + environment.createMessage, message);
    return of({ ...message })
      .pipe(
        map((msg: Message) => {
          msg.lastUpdatedDate = new Date();
          return msg;
        }),
        delay(1000)
      );
  }

  getAllMessages(chatId: string): Observable<Message[]> {
    // return this.http.post<any>(environment.chat + environment.getAllMessages, message);
    this.counter += 1;
    return of(JSON.parse(JSON.stringify([testMessagePhoto, testMessageFile, testMessageVideo, testMessageFile, testMessagePhoto])))
      .pipe(
        map((msg: Message[]) => {
          for (let i = 0; i < msg.length; i++) {
            const dt = new Date();
            dt.setMinutes(dt.getMinutes() - this.counter);
            msg[i].lastUpdatedDate = dt;
          }
          return msg;
        }),
        delay(1000)
      );
  }

  sortMessages(messages: Message[]): Message[] {
    return messages.sort((a: Message, b: Message) => {
      return a.lastUpdatedDate.getTime() - b.lastUpdatedDate.getTime();
    });
  }

}
