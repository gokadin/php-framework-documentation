import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {FormField} from '../../components/formField/formField';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        FormField,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormField,
    ]
})
export class SharedModule {

}
