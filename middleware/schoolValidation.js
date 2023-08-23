const Joi = require("@hapi/joi");

const validateSchool = (req, res, next) => {
    const schema = Joi.object({
        schoolName: Joi.string().required().messages(),
        email: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'This is a wrong email format',
            "string.empty": "Please provide an email ."
        }),
        logo: Joi.string(),
        address: Joi.string().required(),
        password: Joi.string().required().messages({
            'string.pattern.base': 'School Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
            "string.base": "Please provide a Password.",
            "string.empty": "Please provide a Password.",
        }),
        comfirmPassword: Joi.string(),
    });

    const {error} = schema.validate(req.body);

    if(error) {
        // Handle validator error
        const errorMessage = error.details.map(details => details.message).join(',');
        return res.status(400).json({error: errorMessage});
    }
    next();
};

const validateEmail = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'This is a wrong email format',
            "string.empty": "Please provide an email ."
        }),
    })
    const {error} = schema.validate(req.body);

    if(error) {
        // Handle validator error
        const errorMessage = error.details.map(details => details.message).join(',');
        return res.status(400).json({error: errorMessage});
    }
    next();
}

const validatelogIn = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            'string.pattern.base': 'This is a wrong email format',
            "string.empty": "Please provide an email ."
        }), 
        password: Joi.string().required().messages({
            'string.pattern.base': 'School Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
            "string.base": "Please provide a Password.",
            "string.empty": "Please provide a Password.",
        }),
    })
    const {error} = schema.validate(req.body);

    if(error) {
        // Handle validator error
        const errorMessage = error.details.map(details => details.message).join(',');
        return res.status(400).json({error: errorMessage});
    }
    next();
}

const validateUpdate = (req, res, next) => {
    const schema = Joi.object({
        // schoolName, email, address, logo, password 
        schoolName: Joi.string().messages(),
        email: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).messages({
            'string.pattern.base': 'This is a wrong email format',
        }),
        logo: Joi.string(),
        address: Joi.string(),
        password: Joi.string().messages({
            'string.pattern.base': 'School Password must contain at least 6 characters with Capital or Small letters, or Number and spaces',
        }),
    })
    const {error} = schema.validate(req.body);

    if(error) {
        // Handle validator error
        const errorMessage = error.details.map(details => details.message).join(',');
        return res.status(400).json({error: errorMessage});
    }
    next();
}



module.exports = {
    validateSchool,
    validateEmail,
    validatelogIn,
    validateUpdate
};