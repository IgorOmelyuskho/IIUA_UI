import { Injectable, ApplicationRef, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  data: any = {};

  constructor(private http: HttpClient/* , private ref: ApplicationRef *//* , private injector: Injector */) {}

  use(lang: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      const langPath = `../../assets/i18n/${lang || 'ru'}.json`;
      this.http.get<{}>(langPath).subscribe(
        translation => {
          this.data = Object.assign({}, translation || {});
          resolve(this.data);
          // this.ref.tick();
        },
        error => {
          this.data = {};
          resolve(this.data);
        }
      );
    });
  }
}
