import { Routes } from '@angular/router';

import { IndexPage } from './pages/index/index.page';
import { NotFound404Component } from './not-found404.component';

export const routes: Routes = [
    {path: '', component: IndexPage, pathMatch: 'full'},
    {path: '**', component: NotFound404Component }
];
