import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../translate.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {
  }

  transform(key: any, constructorName: any): any {
    // return this.translateService.data[constructorName][key] || key;

    // use in dev
    const res = this.translateService.data[constructorName][key];
    if (res == null) {
      throw  new Error('Error in translate pipe');
    } else {
      return res;
    }
  }

}
