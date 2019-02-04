import { MaterialModule } from './modules';
import { PrimeNgModule } from './modules';
import { AppRoutingModule } from './app-routing.module';

import { ErrorInterceptor } from './services/interceptors';
import { AddTokenInterceptor } from './services/interceptors';
import { AuthGuard } from './services/guards';

import { AppComponent } from './app.component';
import * as Components from './components';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    Components.IndexComponent,
    Components.SigninComponent,
    Components.SignupComponent,
    Components.HomePageComponent,
    Components.HeaderComponent,
    Components.InvestorComponent,
    Components.VendorComponent,
    Components.VendorProfileComponent,
    Components.InvestorProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    PrimeNgModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextMaskModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
