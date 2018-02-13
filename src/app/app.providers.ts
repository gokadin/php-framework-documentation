import {RequestBase} from './services/request-base';
import services from "./services";
import actions from './actions';
import selectors from './selectors';
import {RequestOptions} from "@angular/http";

export const APP_PROVIDERS = [
  services,
  actions,
  selectors,
  {provide: RequestOptions, useClass: RequestBase}
];
