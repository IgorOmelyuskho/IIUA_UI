import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GetOrCreateChatResponse } from 'src/app/models/chat/getOrCreateChatResponse';
import { Message } from 'src/app/models/chat/message';
import { testMessagePhoto, testMessageFile } from 'src/app/helperClasses/messages';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getOrCreateP2P(userId: string): Observable<GetOrCreateChatResponse> { // userId - которому хотим написать
    return this.http.get<any>(environment.chat + environment.getOrCreateChat + userId);
  }

  createMessage(message: Message): Observable<Message> {
    // return this.http.post<any>(environment.chat + environment.createMessage, message);
    return of(testMessagePhoto)
      .pipe(
        delay(1000)
      );
  }

  getAllMessages(): Observable<Message[]> {
    // return this.http.post<any>(environment.chat + environment.getAllMessages, message);
    return of([testMessagePhoto, testMessageFile, testMessagePhoto, testMessageFile, testMessagePhoto])
      .pipe(
        delay(1000)
      );
  }

}
