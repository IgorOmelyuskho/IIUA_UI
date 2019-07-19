import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProjectsService } from './http/projects.service';

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

  constructor(private http: HttpClient, private projectsService: ProjectsService) { }

  use(lang: string): Promise<{}> {
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
            resolve(this.data);
          },
          error => {
            console.error(error);
          }
        );
    });
  }

  getSphereActivityOption(): void {
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
        },
        error => {
          console.error(error);
        }
      );
  }
}
