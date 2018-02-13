import {combineReducers, ActionReducer} from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeLogger } from 'ngrx-store-logger';

export interface AppState {
}

export const reducers = {
};

function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        if (action.type === 'SET_ROOT_STATE') {
            return action.payload;
        }
        return reducer(state, action);
    };
}


//const DEV_REDUCERS = [stateSetter, storeFreeze]; // enable that to enforce immutability in all reducers
const DEV_REDUCERS = [stateSetter];
// set in constants.js file of project root
if (['logger', 'both'].indexOf(STORE_DEV_TOOLS) !== -1 ) {
    DEV_REDUCERS.push(storeLogger());
}

const developmentReducer = compose(...DEV_REDUCERS, combineReducers)(reducers);
const productionReducer = compose(combineReducers)(reducers);

export function rootReducer(state: any, action: any) {
    if (ENV !== 'development') {
        return productionReducer(state, action);
    } else {
        return developmentReducer(state, action);
    }
}
