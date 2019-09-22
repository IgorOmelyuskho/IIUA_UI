import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Chat } from 'src/app/models/chat/chat';
import { Message } from 'src/app/models/chat/message';
import { testMessagePhoto, testMessageFile, testMessageVideo } from 'src/app/helperClasses/messages';
import { delay, map, tap } from 'rxjs/operators';
import { Participant } from 'src/app/models/chat/chatParticipant';
import { ChatType } from 'src/app/models/chat/chatType';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  counter = 0; // todo remove

  constructor(private http: HttpClient) { }

  getOrCreateP2P(projectId: number): Observable<Chat> {
    const params = new HttpParams().set('projectId', projectId.toString());
    return this.http.get<any>(environment.chat + environment.getOrCreateChat, { params: params });
  }

  getAllChats(chatType: ChatType): Observable<Chat[]> { // chats for current user (token)
    const params = new HttpParams().set('conversationType', chatType);
    return this.http.get<any>(environment.chat + environment.getAllChats, { params: params });
  }

  getChatById(chatId: string): Observable<Chat> {
    const params = new HttpParams().set('conversationId', chatId);
    return this.http.get<any>(environment.chat + environment.getChatById, { params: params });
  }

  getChatBProjectId(projectId: number): Observable<Chat> {
    const params = new HttpParams().set('projectId', projectId.toString());
    return this.http.get<any>(environment.chat + environment.getChatByProjectId, { params: params });
    // const chat: Chat = {
    //   id: 'chatId',
    //   title: 'chatTitle',
    //   creatorId: 'creatorId',
    //   conversationType: ChatType.all2all,
    //   lastMessage: 'lastMessage',
    //   lastMessageId: 'lastMessageId',
    //   icon: 'icon',
    //   lastActivityDate: new Date(),
    //   leaveDate: null,
    //   participants: [
    //     {
    //       id: 'participantId-1',
    //       userId: 'userId-1',
    //       participantsRole: 0,
    //       conversationId: 'chatId',
    //       lastReadDate: new Date(),
    //       createdDate: new Date(),
    //       unreadsNumber: 0,
    //       leaveDate: null,
    //     },
    //     {
    //       id: 'participantId-2',
    //       userId: 'userId-2',
    //       participantsRole: 0,
    //       conversationId: 'chatId',
    //       lastReadDate: new Date(),
    //       createdDate: new Date(),
    //       unreadsNumber: 0,
    //       leaveDate: null,
    //     }
    //   ],
    //   projectId: projectId.toString() // for All2All
    // };
    // return of(chat);
  }






  createMessage(message: Message): Observable<Message> {
    return this.http.post<any>(environment.chat + environment.createMessage, message)
    .pipe(
      map((msg: Message) => {
        msg.createdDate = new Date(msg.createdDate); // not remove
        return msg;
      })
    );

    // return of({ ...message }) // todo remove
    //   .pipe(
    //     map((msg: Message) => {
    //       msg.createdDate = new Date();
    //       return msg;
    //     }),
    //     delay(1000)
    //   );
  }

  updateMessage(messageId: string, updatedMessage: Message): Observable<any> {
    return this.http.put<any>(environment.chat + environment.updateMessage + '/' + messageId, updatedMessage);
  }

  getMessagesByChatId(chatId: string, data?: any, count?: number): Observable<Message[]> {
    const params = new HttpParams().set('conversationId', chatId);
    return this.http.get<any>(environment.chat + environment.getMessagesByChatId, { params: params })
    .pipe(
      map((messages: Message[]) => {
        for (let i = 0; i < messages.length; i++) {
          messages[i].createdDate = new Date(messages[i].createdDate); // not remove
        }
        return messages;
      })
    );

    // this.counter += 1;
    // return of(JSON.parse(JSON.stringify([testMessagePhoto, testMessageFile, testMessageVideo, testMessageFile, testMessagePhoto])))
    //   .pipe(
    //     map((msg: Message[]) => {
    //       for (let i = 0; i < msg.length; i++) {
    //         const dt = new Date();
    //         dt.setMinutes(dt.getMinutes() - this.counter);
    //         msg[i].createdDate = dt;
    //       }
    //       return msg;
    //     }),
    //     delay(1000)
    //   );
  }





getParticipantById(participantId: string): Observable<Participant> {
  const params = new HttpParams().set('participantId', participantId);
  return this.http.get<any>(environment.chat + environment.getParticipantById, { params: params });
}

getParticipantsByChatId(chatId: string): Observable<Participant[]> {
  const params = new HttpParams().set('conversationId', chatId);
  return this.http.get<any>(environment.chat + environment.getParticipantByChatId, { params: params });
}




  sortMessages(messages: Message[]): Message[] {
    return messages.sort((a: Message, b: Message) => {
      return a.createdDate.getTime() - b.createdDate.getTime();
    });
  }

}
