const Joi = require("@hapi/joi");

const validateStudent = (req, res, next) => {
    const schema = Joi.object({
        studentName: Joi.string().required(),
        email: Joi.string().pattern(/^[A-Za-z0-9\s.,'"\-]{9,}$/).required(),
        studentImage: Joi.string().required(),
        parentEmail: Joi.string().pattern(/^[A-Za-z0-9\s.,'"\-]{9,}$/).required(),
        addresss: Joi.string().required(),
        password: Joi.string().pattern(/^[A-Za-z0-9]{6}$/).required(),
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
    //    studentName, email, addresss, parentEmail, password
         studentName: Joi.string().messages(),
        email: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).messages({
            'string.pattern.base': 'This is a wrong email format',
        }),
        parentEmail: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).messages({
            'string.pattern.base': 'This is a wrong email format',
        }),
        studentImage: Joi.string().messages(),
        address: Joi.string().messages(),
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
    validateStudent,
    validatelogIn,
    validateUpdate,
    validateEmail
};