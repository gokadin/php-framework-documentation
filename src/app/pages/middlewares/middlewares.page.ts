import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/index';

@Component({
    selector: 'middlewares-page',
    templateUrl: './middlewares.page.html',
    styleUrls: ['./middlewares.page.css']
})
export class MiddlewaresPage {
    constructor(private store: Store<AppState>) {
    }
}
