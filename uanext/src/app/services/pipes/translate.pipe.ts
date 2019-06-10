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
    console.log(this.translateService.data);
    console.log(this.translateService.data[constructorName]);
    return this.translateService.data[constructorName][key] || key;
  }

}
