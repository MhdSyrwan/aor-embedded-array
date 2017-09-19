import { required } from 'admin-on-rest';

const isRequired = validate => {
    if (validate === required) return true;
    if (Array.isArray(validate)) {
        return validate.includes(required);
    }
    return false;
};

export default isRequired;
