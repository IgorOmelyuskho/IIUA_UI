import { Injectable } from '@angular/core';
import { Participant } from '../models/chat/chatParticipant';
import { Observable, of, BehaviorSubject, ReplaySubject } from 'rxjs';
import { ChatService } from './http/chat.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParticipantsCacheService {
  private cache: { [key: string]: ReplaySubject<Participant> } = {};

  constructor(private chatService: ChatService) { }

  getParticipant(participantId: string): Observable<Participant> {
    let result: Observable<Participant>;
    if (this.cache[participantId]) {
      result = this.cache[participantId];
    } else {
      result = this.addRequestToCache(participantId);
    }

    return result.pipe( // return participant clone, ( if participant == null - return null because {...null} === {} )
      map((participant: Participant) => {
        if (participant == null) {
          return null;
        } else {
          return { ...participant };
        }
      })
    );
  }

  private addRequestToCache(participantId: string): Observable<Participant> {
    this.cache[participantId] = new ReplaySubject(1);
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
