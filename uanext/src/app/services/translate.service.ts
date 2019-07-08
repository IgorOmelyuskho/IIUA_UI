import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface FieldActivityInterface {
  id: string;
  name: string;
  checked: boolean;
}

export interface UpdateRateInterface {
  id: string;
  name: string;
  checked: boolean;
  name2: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  data: any = {};
  lang: string;

  fieldOfActivityOptions: BehaviorSubject<FieldActivityInterface[]> = new BehaviorSubject(null);
  updateRateOptions: BehaviorSubject<UpdateRateInterface[]> = new BehaviorSubject(null);
  filterItems: BehaviorSubject<any> = new BehaviorSubject(null);
  region: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  use(lang: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      const langPath = `../../assets/i18n/${lang || 'ru'}.json`;
      this.http.get<{}>(langPath).subscribe(
        translation => {
          this.lang = lang;
          this.fieldOfActivityOptions.next(translation['fieldOfActivity']);
          this.updateRateOptions.next(translation['updateRateOptions']);
          this.filterItems.next(translation['FilterItemsComponent']);
          this.region.next(translation['region']);
          this.data = Object.assign({}, translation || {});
          resolve(this.data);
        },
        error => {
          console.error(error);
          this.data = {};
          resolve(this.data);
        }
      );
    });
  }
}
