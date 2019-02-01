import { ErrorInterceptor } from './interceptors/error-interceptor';
import { AddTokenInterceptor } from './interceptors/add-token';
import { AuthGuard } from './guards/auth.guard';
import { PrimeNgModule } from './primeng/primeng.module';
import { MaterialModule } from './angular-material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { TextMaskModule } from 'angular2-text-mask';
import { InvestorComponent } from './components/investor/investor.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { VendorProfileComponent } from './components/vendor-profile/vendor-profile.component';
import { InvestorProfileComponent } from './components/investor-profile/investor-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SigninComponent,
    SignupComponent,
    HomePageComponent,
    HeaderComponent,
    InvestorComponent,
    VendorComponent,
    VendorProfileComponent,
    InvestorProfileComponent,
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
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
