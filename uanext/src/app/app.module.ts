import { MaterialModule } from './modules';
import { PrimeNgModule } from './modules';
import { AppRoutingModule } from './app-routing.module';

import { ErrorInterceptor, AddTokenInterceptor } from './services/interceptors';
import { AuthGuard, NoAuthGuard, InvestorGuard, VendorGuard } from './services/guards';

import { AppComponent } from './app.component';
import { components } from './components';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { NgxSortableModule } from 'ngx-sortable';
import { NgxGalleryModule } from 'ngx-gallery';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HighlightPipe } from './services/pipes/highlight.pipe';
import { TranslatePipe } from './services/pipes/translate.pipe';
import { TranslateService } from './services/translate.service';

export function setupTranslateFactory(service: TranslateService): Function {
  return () => service.use('ru');
}

@NgModule({
  declarations: [
    AppComponent,
    ...components,
    HighlightPipe,
    TranslatePipe,
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
    NgxGalleryModule,
    InfiniteScrollModule
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
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [ TranslateService ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
