import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/index';

@Component({
    selector: 'validation-page',
    templateUrl: './validation.page.html',
    styleUrls: ['./validation.page.css']
})
export class ValidationPage {
    constructor(private store: Store<AppState>) {
    }
}
