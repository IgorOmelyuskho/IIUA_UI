import { MaterialModule } from './modules';
import { PrimeNgModule } from './modules';
import { AppRoutingModule } from './app-routing.module';

import { ErrorInterceptor, AddTokenInterceptor } from './services/interceptors';
import { AuthGuard, NoAuthGuard, InvestorGuard, VendorGuard } from './services/guards';

import { AppComponent } from './app.component';
import { components } from './components';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { NgxSortableModule } from 'ngx-sortable';
import { NgxGalleryModule } from 'ngx-gallery';

@NgModule({
  declarations: [
    AppComponent,
    ...components,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    PrimeNgModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextMaskModule,
    FormsModule,
    NgxSortableModule,
    NgxGalleryModule
  ],
  entryComponents: [
    SnackBarComponent
  ],
  providers: [
    AuthGuard,
    NoAuthGuard,
    InvestorGuard,
    VendorGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
