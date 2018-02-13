import { RouterModule, PreloadAllModules } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { routes } from './app.routing';
import {rootReducer} from './reducers';
import { StoreDevToolsModule } from './features/store-devtools.module';
import effects from './effects';
import {SharedModule} from "./modules/sharedModule/shared.module";

const STORE_DEV_TOOLS_IMPORTS = [];
if (ENV === 'development' && !AOT &&
  ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
) STORE_DEV_TOOLS_IMPORTS.push(...[
  StoreDevtoolsModule.instrumentStore({
    monitor: useLogMonitor({
      visible: true,
      position: 'right'
    })
  })
]);

export const APP_IMPORTS = [
    SharedModule,
    effects.map(EffectsModule.run),
    NgbModule.forRoot(),
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    RouterStoreModule.connectRouter(),
    StoreModule.provideStore(rootReducer),
    STORE_DEV_TOOLS_IMPORTS,
    StoreDevToolsModule
];

