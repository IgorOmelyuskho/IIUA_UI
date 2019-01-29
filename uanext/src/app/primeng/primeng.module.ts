import { NgModule } from '@angular/core';

import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ChartModule, CalendarModule, SharedModule } from 'primeng/primeng';


@NgModule({
    declarations: [],
    imports: [],
    exports: [ // TODO compiler.js:1021 Uncaught Error: Template parse errors: 'p-toast' is not a known element:
        CheckboxModule,
        ButtonModule,
        ChartModule,
        CalendarModule,
        SharedModule,
    ]
})
export class PrimeNgModule { }
