import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chat } from '../models/chat/chat';
import { ChatService } from './http/chat.service';

@Injectable({
  providedIn: 'root'
})
export class ChatsCacheService {
  private cache: { [key: string]: BehaviorSubject<Chat> } = {};

  constructor(private chatService: ChatService) { }

  getData(projectId: string): Observable<Chat> {
    if (this.cache[projectId]) {
      return this.cache[projectId];
    } else {
      return this.addChatToCache(projectId);
    }
  }

  private addChatToCache(projectId: string): Observable<Chat> {
    this.cache[projectId] = new BehaviorSubject(null);
    this.chatService.getChatBProjectId(parseInt(projectId, 10)).subscribe(
      (chat: Chat) => {
        this.cache[projectId].next(chat);
      },
      err => {
        console.warn(err);
      }
    );
    return this.cache[projectId];
  }
}
