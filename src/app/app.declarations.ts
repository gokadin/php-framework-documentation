import { IndexPage } from './pages/index/index.page';
import {MainMenu} from './components/mainMenu/mainMenu';
import { NotFound404Component } from './not-found404.component';
import {Header} from "./components/header/header";
import {ValidationPage} from "./pages/validation/validation.page";
import {ControllersPage} from "./pages/controllers/controllers.page";

export const APP_DECLARATIONS = [
    IndexPage,
    MainMenu,
    Header,
    ValidationPage,
    ControllersPage,
    NotFound404Component,
];
