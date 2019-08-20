import { Injectable } from '@angular/core';
import { Participant } from '../models/chat/chatParticipant';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ChatService } from './http/chat.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsCacheService {
  private cache: { [key: string]: BehaviorSubject<Participant> }[] = [];

  constructor(private chatService: ChatService) { }

  getData(participantId: string): Observable<Participant> {
    if (this.cache[participantId]) {
      return this.cache[participantId];
    } else {
      return this.addRequestToCache(participantId);
    }
  }

  private addRequestToCache(participantId: string): Observable<Participant> {
    this.cache[participantId] = new BehaviorSubject(null);
    this.chatService.getParticipantById(participantId).subscribe(
      (participant: Participant) => {
        this.cache[participantId].next(participant);
      },
      err => {
        console.warn(err);
      }
    );
    return this.cache[participantId];
  }
}
