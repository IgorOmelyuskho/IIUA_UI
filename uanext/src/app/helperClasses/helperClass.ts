export default class FormHelper {
  static readonly phoneMask: any[] = ['+', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
  static readonly phonePattern = /\+\d{3}\s\d{2}\s\d{3}\s\d{4}/;

  // tslint:disable:max-line-length
  static readonly emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // tslint:enable:max-line-length

  static readonly creditCardMask: any[] = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/,
    /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  static readonly creditCardPattern = /([0-9\s]){19}$/;

  static readonly  acceptFilesTypes = 'text/*,application/pdf,application/msword,' +
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document,' +
  'application/vnd.openxmlformats-officedocument.wordprocessingml.template,' +
  'application/vnd.ms-word.document.macroEnabled.12,application/vnd.ms-excel';

  static readonly emptyAvatara = '../../../assets/img/empty-profile.jpg';

  static readonly bigNumberMask: any[] = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/,
  '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/];
}
