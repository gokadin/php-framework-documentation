import {ActionReducer, Action} from '@ngrx/store';

import {FormActions} from '../../actions/form.actions';
import {validateField} from '../../utils/form.utils';

export interface FormState {
    isValid: boolean,
    fieldIds: string[],
    fields: any
}

export const initialState = {
    isValid: false,
    fieldIds: [],
    fields: {}
};

interface FormField {
    name: string;
    value: any;
    validations?: FormFieldValidation[]
}

interface FormFieldValidation {
    type: string;
    message: string;
}

export const buildFormState = (data: FormField[]): FormState => {
    let fieldIds = [];
    let fields = {};
    for (let i = 0; i < data.length; i++) {
        fieldIds.push(data[i].name);
        fields[data[i].name] = {
            name: data[i].name,
            value: data[i].value,
            initialValue: data[i].value,
            validations: ('validations' in data[i]) ? data[i].validations : [],
            isValid: false,
            isTouched: false,
            error: ''
        };
    }

    return {
        isValid: false,
        fieldIds: fieldIds,
        fields: fields
    };
};

const isValid = (state: boolean, action: Action, args: any = {}) => {
    switch (action.type) {
        case FormActions.VALIDATE_FIELD:
            return !args.fieldIds.find(fieldId => !args.validatedFields[fieldId].isValid);
        case FormActions.VALIDATE_FORM:
            return !args.fieldIds.find(fieldId => !args.validatedFields[fieldId].isValid);
        default:
            return state;
    }
};

const fields = (state: any, action: Action, args: any = {}) => {
    switch (action.type) {
        case FormActions.TOUCH:
            if (state[action.payload].isTouched) {
                return state;
            }
            return Object.assign({}, state, {
                [action.payload]: Object.assign({}, state[action.payload], {
                    isTouched: true
                })
            });
        case FormActions.UPDATE_VALUE:
            return Object.assign({}, state, {
                [action.payload.id]: Object.assign({}, state[action.payload.id], {
                    value: action.payload.value
                })
            });
        case FormActions.VALIDATE_FIELD:
            return Object.assign({}, state, {[action.payload]: validateField(state[action.payload])});
        case FormActions.VALIDATE_FORM:
            let validatedFields = {};
            args.fieldIds.map(fieldId => validatedFields[fieldId] = validateField(state[fieldId]));
            args.fieldIds.map(fieldId => validatedFields[fieldId].isTouched = true);
            return validatedFields;
        case FormActions.RESET:
            return args.fieldIds
                .reduce((acc, fieldId) => Object.assign(acc, {[fieldId]: Object.assign({}, state[fieldId], {
                    value: state[fieldId].initialValue,
                    isTouched: false,
                    isValid: false,
                    error: ''
                })}), {});
        default:
            return state;
    }
};

export const formReducer: ActionReducer<FormState> = (state: FormState = initialState, action: Action) => {
    switch (action.type) {
        case FormActions.TOUCH:
            return Object.assign({}, state, {fields: fields(state.fields, action)});
        case FormActions.UPDATE_VALUE:
            return Object.assign({}, state, {fields: fields(state.fields, action)});
        case FormActions.VALIDATE_FIELD:
            let validFields = fields(state.fields, action);
            return Object.assign({}, state, {
                fields: validFields,
                isValid: isValid(state.isValid, action, {validatedFields: validFields, fieldIds: state.fieldIds})
            });
        case FormActions.VALIDATE_FORM:
            let validatedFields = fields(state.fields, action, {fieldIds: state.fieldIds});
            return Object.assign({}, state, {
                fields: validatedFields,
                isValid: isValid(state.isValid, action, {validatedFields: validatedFields, fieldIds: state.fieldIds})
            });
        case FormActions.RESET:
            return Object.assign({}, state, {fields: fields(state.fields, action, {fieldIds: state.fieldIds})});
        default:
            return state;
    }
};