import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AddTokenInterceptor implements HttpInterceptor {

    constructor() {
        //
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const tokenizedRequest: HttpRequest<any> = request.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // TODO
            }
        });

        return next.handle(tokenizedRequest);
    }
}
