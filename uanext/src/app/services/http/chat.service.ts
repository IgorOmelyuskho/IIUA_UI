import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Chat } from 'src/app/models/chat/chat';
import { Message } from 'src/app/models/chat/message';
import { delay, map, tap } from 'rxjs/operators';
import { Participant } from 'src/app/models/chat/chatParticipant';
import { ChatType } from 'src/app/models/chat/chatType';
import { GetChatsParams } from 'src/app/models/chat/getChatsParams';
import { StateService } from '../state.service';
import { IShowUnreadMessages } from 'src/app/models/chat/unreadMessage';
import { VendorProject } from 'src/app/models/vendorProject';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  counter = 0; // todo remove
  setCloseAllCardsMenu$: BehaviorSubject<boolean> = new BehaviorSubject(null);
  showUnreadMessages$: ReplaySubject<IShowUnreadMessages> = new ReplaySubject(1);
  unreadChatsCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  blockedOrUnblockedChat$: ReplaySubject<Chat> = new ReplaySubject(null);
  selectedProjectForChat$: BehaviorSubject<VendorProject> = new BehaviorSubject(null);
  allCurrentUserChats: Chat[];

  constructor(private http: HttpClient, private stateService: StateService) { }

  getOrCreateP2P(projectId: string): Observable<Chat> {
    const params = new HttpParams().set('projectId', projectId.toString());
    return this.http.get<any>(environment.chat + environment.getOrCreateChat, { params: params });
  }

  getAllChats(chatType?: ChatType, projectName?: string): Observable<Chat[]> { // chats for current user (token)
    let params = new HttpParams();
    if (chatType != null) {
      params = params.append('chatType', chatType);
    }
    if (projectName != null) {
      params = params.append('projectName', projectName);
    }
    return this.http.get<any>(environment.chat + environment.getAllChats, { params: params });
  }

  getChatById(chatId: string): Observable<Chat> {
    const params = new HttpParams().set('conversationId', chatId);
    return this.http.get<any>(environment.chat + environment.getChatById, { params: params });
  }

  getChatByProjectId(projectId: string): Observable<Chat> {
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

  getPaginationOfConversations(getChatParams: GetChatsParams): Observable<Chat[]> {
    let params = new HttpParams();
    if (getChatParams.conversationType != null) {
      params = params.append('conversationType', getChatParams.conversationType);
    }
    if (getChatParams.count != null) {
      params = params.append('count', getChatParams.count.toString());
    }
    if (getChatParams.numberOfConversation != null) {
      params = params.append('numberOfConversation', getChatParams.numberOfConversation.toString());
    }
    if (getChatParams.projectName != null) {
      params = params.append('projectName', getChatParams.projectName);
    }
    return this.http.get<any>(environment.chat + environment.getPaginationOfConversations, { params: params });
  }

  blockConversationP2P(conversationId: string, participantId: string) {
    const params = new HttpParams();
    params.set('conversationId', conversationId);
    params.set('participantId', participantId);
    return this.http.put<any>(environment.chat + environment.blockConversationP2P + '?conversationId=' + conversationId + '&participantId=' + participantId, {});
  }

  unblockConversationP2P(conversationId: string, participantId: string) {
    const params = new HttpParams();
    params.set('conversationId', conversationId);
    params.set('participantId', participantId);
    return this.http.put<any>(environment.chat + environment.unblockConversationP2P + '?conversationId=' + conversationId + '&participantId=' + participantId, {});
  }

  getOrCreateHelp(): Observable<Chat> {
    return this.http.get<any>(environment.chat + environment.getOrCreateHelp);
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

  getMessagesByChatId(chatId: string, date: any, count: number): Observable<Message[]> {
    let params = new HttpParams().set('conversationId', chatId);
    if (date != null) {
      params = params.append('date', date.toISOString());
    }
    if (count != null) {
      params = params.append('count', count.toString());
    }
    return this.http.get<any>(environment.chat + environment.getMessagesByChatId, { params: params })
      .pipe(
        map((messages: Message[]) => {
          for (let i = 0; i < messages.length; i++) {
            messages[i].createdDate = new Date(messages[i].createdDate); // not remove
          }
          return messages;
        })
      );
  }





  getParticipantById(participantId: string): Observable<Participant> {
    const params = new HttpParams().set('participantId', participantId);
    return this.http.get<any>(environment.chat + environment.getParticipantById, { params: params });
  }

  getParticipantsByChatId(chatId: string): Observable<Participant[]> {
    const params = new HttpParams().set('conversationId', chatId);
    return this.http.get<any>(environment.chat + environment.getParticipantByChatId, { params: params });
  }

  updateLastReadDate(participantId: string): Observable<any> {
    return this.http.put(environment.chat + environment.updateLastReadDate + '?participantId=' + participantId, {});
  }




  // sortMessages(messages: Message[]): Message[] {
  //   return messages.sort((a: Message, b: Message) => {
  //     return a.createdDate.getTime() - b.createdDate.getTime();
  //   });
  // }

  messageIsYou(message: Message): boolean {
    if (message.userId === this.stateService.getUserId()) {
      return true;
    } else {
      return false;
    }
  }

  hasChatUnreadMessage(chat: Chat): boolean {
    let needShowUnreadMsg: boolean;
    if (chat.participant != null) {
      needShowUnreadMsg = new Date(chat.lastActivityDate).getTime() > new Date(chat.participant.lastReadDate).getTime();
    }

    if (chat.participant != null && needShowUnreadMsg) {
      return true;
    } else {
      return false;
    }
  }

  markChatAsUnread(chatId: string) {
    this.showUnreadMessages$.next({ chatId, isUnread: true });
    this.unreadChatsCount$.next(this.unreadChatsCount$.getValue() + 1);
  }

  markChatAsRead(chat: Chat) {
    this.showUnreadMessages$.next({ chatId: chat.id, isUnread: false });
    this.unreadChatsCount$.next(this.unreadChatsCount$.getValue() - 1);
    if (chat.participant != null) { // if user exist as participant in this chat
      this.updateLastReadDate(chat.participant.id).subscribe();
    }
  }

}
