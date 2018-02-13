import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

@Injectable()
export class FormActions {
    static TOUCH = 'TOUCH';
    touch(name: string): Action {
        return {
            type: FormActions.TOUCH,
            payload: name
        };
    }

    static UPDATE_VALUE = 'UPDATE_VALUE';
    updateValue(name: string, value: any): Action {
        return {
            type: FormActions.UPDATE_VALUE,
            payload: {
                id: name,
                value: value
            }
        };
    }

    static VALIDATE_FIELD = 'VALIDATE_FIELD';
    validateField(name: string): Action {
        return {
            type: FormActions.VALIDATE_FIELD,
            payload: name
        };
    }

    static VALIDATE_FORM = 'VALIDATE_FORM';
    validateForm(): Action {
        return {
            type: FormActions.VALIDATE_FORM
        };
    }

    static RESET = 'RESET';
    reset(): Action {
        return {
            type: FormActions.RESET
        };
    }
}