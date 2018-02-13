export const normalize = (data: any[], options: any = {}, root: any = {rule: 'id'}) => {
    let obj = {};

    data.map(entity => {
        let key = root.rule == 'id' ? entity.id : root.prefix + '.' + entity.id;
        obj[key] = Object.assign({}, entity, generateProperties(entity, options));
    });

    return obj;
};

const generateProperties = (data: any, options: any) => {
    let properties = {};

    for (let key in options) {
        if (options.hasOwnProperty(key)) {
            switch (options[key].rule) {
                case 'id':
                    properties[key] = generateById(data, key);
                    break;
                case 'aggregate':
                    properties[key] = generateByAggregation(data, key);
            }
        }
    }

    return properties;
};

const generateById = (data: any, key: any) => {
    if (Array.isArray(data[key])) {
        return data[key].map(entity => entity.id);
    }

    return data[key].id;
};

const generateByAggregation = (data: any, key: any) => {
    if (Array.isArray(data[key])) {
        return data[key].map(entity => data.id + '.' + entity.id);
    }

    return data.id + '.' + data[key].id;
}