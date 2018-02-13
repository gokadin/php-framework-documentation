import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/index';

@Component({
    selector: 'index-page',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.css']
})
export class IndexPage {
    constructor(private store: Store<AppState>) {
    }
}
