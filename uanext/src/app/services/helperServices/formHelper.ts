export default class FormHelper {
  static readonly phoneMask: any[] = ['+', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
  static readonly phonePattern = /\+\d{3}\s\d{2}\s\d{3}\s\d{4}/;

  static readonly emailPattern = /\S+@\S+\.\S+/;

  static readonly creditCardMask: any[] = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/,
  /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  static readonly creditCardPattern = /([0-9\s]){19}$/;
}
