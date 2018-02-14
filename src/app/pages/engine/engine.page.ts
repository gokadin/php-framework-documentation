import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/index';

@Component({
    selector: 'engine-page',
    templateUrl: './engine.page.html',
    styleUrls: ['./engine.page.css']
})
export class EnginePage {
    constructor(private store: Store<AppState>) {
    }
}
