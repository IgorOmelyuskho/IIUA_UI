import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  phoneMask: any[] = ['+', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
  phonePattern = /\+\d{3}\s\d{2}\s\d{3}\s\d{4}/;
  // phoneMask: any[] = ['+', /\d/, /\d/, /\d/];
  // phonePattern = /\+\d{3}/;

  creditCardMask: any[] = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
  creditCardPattern = /([0-9\s]){19}$/;

  constructor() { }
}
