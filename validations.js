const Joi = require('joi');

const registerValidation = data => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    // Joi.validate(data, schema, (err, value) => {
    //     return err;
    // });
    return Joi.validate(data, schema);
};

const loginValidation = data => {
    const schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;