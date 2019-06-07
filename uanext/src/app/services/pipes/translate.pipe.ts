import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../translate.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {
    // console.log("THIS PIPE = ", this);
  }

  transform(key: any, constructorName: any): any {
    // console.log(key, ' = ', this.translateService.data[key] || key);
    // console.log(constructorName);
    return this.translateService.data[constructorName][key] || key;
  }

}
