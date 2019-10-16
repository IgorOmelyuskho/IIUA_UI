import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  createNotification(email: string): Observable<any> {
    return this.http.post(environment.notifications + environment.createAdvertising, { email });
  }

  removeNotification(id: string): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.http.delete(environment.notifications + environment.createAdvertising, { params });
  }

  sendForOne(id: string): Observable<any> {
    return this.http.put(environment.notifications + environment.notificationMessage, { id });
  }

  sendForAll(): Observable<any> {
    return this.http.put(environment.notifications + environment.notificationMessage, {});
  }

  getList(page: number, size: number): Observable<any> {
    // const params = new HttpParams();
    // params.set('page', page.toString());
    // params.set('size', size.toString());
    // return this.http.get(environment.notifications + environment.notificationMessage, { params });

    const res: any = [];

    for (let i = 0; i < size; i++) {
      res.push({
        email: 'some.email.gmail.com',
        sended: Math.random() > 0.5 ? true : false,
        id: Math.random()
      });
    }

    return of(res);
  }
}
