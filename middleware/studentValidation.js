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

module.exports = {validateStudent};