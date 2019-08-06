import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AuthorizationService } from '../http/authorization.service';
import { NotificationService } from '../notification.service';

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
              console.warn(error);
              this.authService.signOut();
            }
            if (error.status === 400) {
              console.warn(error);
              this.notify.show(error.error.error.errorMessage[0]);
            }

            return throwError(error);
          })
      );
  }
}
