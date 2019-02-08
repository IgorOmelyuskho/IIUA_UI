import { MaterialModule } from './modules';
import { PrimeNgModule } from './modules';
import { AppRoutingModule } from './app-routing.module';

import { ErrorInterceptor } from './services/interceptors';
import { AddTokenInterceptor } from './services/interceptors';
import { AuthGuard } from './services/guards';

import { AppComponent } from './app.component';
import { components } from './components';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { SignupVendorComponent } from './components/signup-vendor/signup-vendor.component';
import { SignupInvestorComponent } from './components/signup-investor/signup-investor.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ...components,
    SignupVendorComponent,
    SignupInvestorComponent,
    SnackBarComponent,
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
