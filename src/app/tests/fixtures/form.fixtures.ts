export const getFields = (count: number, overrides: any = {}) => {
    let fields = [];

    for (let i = 0; i < count; i++) {
        fields.push(Object.assign({
            name: 'name' + (i + 1),
            value: 'value' + (i + 1)
        }, overrides));
    }

    return fields;
};

export const getValidations = (count: number, overrides: any = {}) => {
    let validations = [];

    for (let i = 0; i < count; i++) {
        validations.push(Object.assign({
            type: 'required',
            message: 'message' + (i + 1)
        }, overrides));
    }

    return validations;
};