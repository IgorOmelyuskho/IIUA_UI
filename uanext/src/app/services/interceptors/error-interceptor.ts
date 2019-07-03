import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AuthorizationService } from '../http/authorization.service';
import { NotificationService } from '../http/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthorizationService, private notify: NotificationService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        catchError(
          (error: any) => {
            if (error.status === 401) {
              console.log(error);
              this.notify.show(error.statusText);
              if (window.location.href.includes('signin') === false && window.location.href.includes('signup') === false) {
                this.authService.signOut();
              }
            }

            return throwError(error);
          })
      );
  }
}
