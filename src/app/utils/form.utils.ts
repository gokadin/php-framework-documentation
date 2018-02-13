import validator from '../processors/validation.processor';

export const validateField = (field: any): any => {
    if (field.validations.length == 0) {
        return field.isValid ? field : Object.assign({}, field, {
            isValid: true
        });
    }

    let isValid = true;
    let error = '';
    let found = field.validations.find(validation => !callValidationFunction(validation, field));

    if (found) {
        isValid = false;
        error = found.message;
    }

    return Object.assign({}, field, {
        isValid: isValid,
        error: error
    });
};

const callValidationFunction = (validation, field): boolean => {
    switch (validation.type) {
        case 'required':
            return validator.required(field.value)
        case 'min':
            return validator.min(field.value, validation.args[0]);
        case 'max':
            return validator.max(field.value, validation.args[0]);
        case 'email':
            return validator.email(field.value);
        default:
            return false;
    }
};