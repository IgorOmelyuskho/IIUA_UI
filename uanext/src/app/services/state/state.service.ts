import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { User } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  user$: BehaviorSubject<User> = new BehaviorSubject(null);
  authorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }
}
