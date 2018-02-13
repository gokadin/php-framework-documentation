const required = (value: any): boolean => {
    return value !== undefined && value !== null && value !== '';
};

const min = (value: any, size: number): boolean => {
    switch (typeof value) {
        case 'string':
            return value.length >= size;
        case 'number':
            return value >= size;
        default:
            return false;
    }
};

const max = (value: any, size: number): boolean => {
    switch (typeof value) {
        case 'string':
            return value.length <= size;
        case 'number':
            return value <= size;
        default:
            return false;
    }
};

const email = (value: any): boolean => {
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(value);
};

export default {
    required,
    min,
    max,
    email
};