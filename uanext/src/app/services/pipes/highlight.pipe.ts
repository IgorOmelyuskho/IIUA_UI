import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(text: string, filter: string): any {
    if (filter) {
      text = text.replace(new RegExp('(' + filter + ')', 'gi'), '<span class="highlighted">$1</span>');
    }
    return text;
  }

}
