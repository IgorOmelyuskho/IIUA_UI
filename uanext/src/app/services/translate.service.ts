import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ProjectsService } from './http/projects.service';
import { delay } from 'rxjs/operators';

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

  localFileUpload = false;
  fieldOfActivityUpload = false;

  constructor(private http: HttpClient, private projectsService: ProjectsService) { }

  use(lang: string): Promise<{}> {
    this.localFileUpload = false;
    this.fieldOfActivityUpload = false;

    return new Promise<{}>((resolve, reject) => {
      const langPath = `../../assets/i18n/${lang || 'ru'}.json`;
      this.http.get<{}>(langPath)
        .subscribe(
          translation => {
            this.lang = lang;
            this.updateRateOptions.next(translation['updateRateOptions']);
            this.filterItems.next(translation['FilterItemsComponent']);
            this.region.next(translation['region']);
            this.data = Object.assign({}, translation || {});
            this.localFileUpload = true;
            if (this.localFileUpload === true && this.fieldOfActivityUpload === true) {
              resolve(this.data);
            }
          },
          error => {
            console.error(error);
          }
        );

      this.projectsService.getSphereActivity()
        .subscribe(
          (fieldOfActivity: any[]) => {
            fieldOfActivity.unshift({
              id: 0,
              name: 'Select all'
            });
            for (let i = 0; i < fieldOfActivity.length; i++) {
              fieldOfActivity[i].checked = false;
            }
            this.data.fieldOfActivity = fieldOfActivity;
            this.fieldOfActivityOptions.next(this.data['fieldOfActivity']);
            this.fieldOfActivityUpload = true;
            if (this.localFileUpload === true && this.fieldOfActivityUpload === true) {
              resolve(this.data);
            }
          },
          error => {
            console.error(error);
          }
        );
    });
  }
}
