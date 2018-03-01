import { Routes } from '@angular/router';

import { IndexPage } from './pages/index/index.page';
import { NotFound404Component } from './not-found404.component';
import {ValidationPage} from "./pages/validation/validation.page";
import {ControllersPage} from "./pages/controllers/controllers.page";
import {EnginePage} from "./pages/engine/engine.page";
import {MiddlewaresPage} from "./pages/middlewares/middlewares.page";

export const routes: Routes = [
    {path: '', component: IndexPage, pathMatch: 'full'},
    {path: 'validation', component: ValidationPage},
    {path: 'controllers', component: ControllersPage},
    {path: 'middlewares', component: MiddlewaresPage},
    {path: 'engine', component: EnginePage},
    {path: '**', component: NotFound404Component }
];
