const Joi = require("@hapi/joi");

const validateTeacher = (req, res, next) => {
    const schema = Joi.object({
        teacherName: Joi.string().required().messages(),
        email: Joi.string().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required().messages({
            "string.empty": "Please provide an email.",
            'string.pattern.base': 'This is a wrong email format'
        }),
        profile: Joi.string().messages(),
        addresss: Joi.string().required().messages(),
        subject: Joi.string().required().messages(),
        password: Joi.string().required().messages(),
        comfirmPassword: Joi.string().required().messages(),
    });

   //  /^[0-9]{10}$/, 

    const {error} = schema.validate(req.body);

    if(error) {
        // Handle validator error
        const errorMessage = error.details.map(details => details.message).join(',');
        return res.status(400).json({error: errorMessage});
    }

    next();
};

module.exports = {validateTeacher};