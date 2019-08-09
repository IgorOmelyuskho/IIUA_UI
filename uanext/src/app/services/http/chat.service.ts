import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Chat } from 'src/app/models/chat/chat';
import { Message } from 'src/app/models/chat/message';
import { testMessagePhoto, testMessageFile, testMessageVideo } from 'src/app/helperClasses/messages';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  counter = 0; // todo remove

  constructor(private http: HttpClient) { }

  getOrCreateP2P(userId: string): Observable<Chat> { // userId - которому хотим написать
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<any>(environment.chat + environment.getOrCreateChat , { params: params });
  }

  getAllChats(): Observable<Chat[]> { // all chats for current user (token)
    return this.http.get<any>(environment.chat + environment.getAllChats);
  }

  getChatById(chatId: string): Observable<Chat> {
    const params = new HttpParams().set('chatId', chatId.toString());
    return this.http.get<any>(environment.chat + environment.getChatById, { params: params });
  }

  getChatBProjectId(projectId: number): Observable<Chat> {
    const params = new HttpParams().set('projectId', projectId.toString());
    return this.http.get<any>(environment.chat + environment.getChatByProjectId, { params: params });
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

  updateMessage(messageId: string, updatedMessage: Message): Observable<any> {
    return this.http.put<any>(environment.chat + environment.updateMessage + '/' + messageId, updatedMessage);
  }

  getMessagesByChatId(chatId: string): Observable<Message[]> {
    // return this.http.get<any>(environment.chat + environment.getMessagesByChatId + '/' + chatId);
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
