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
    return this.translateService.data[constructorName][key] || key;
  }

}
