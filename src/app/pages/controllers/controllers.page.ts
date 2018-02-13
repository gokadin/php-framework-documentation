import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../reducers/index';

@Component({
    selector: 'controllers-page',
    templateUrl: './controllers.page.html',
    styleUrls: ['./controllers.page.css']
})
export class ControllersPage {
    constructor(private store: Store<AppState>) {
    }
}
