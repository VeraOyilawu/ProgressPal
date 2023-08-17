const Joi = require("@hapi/joi");

const validateResult = (req, res, next) => {
    const schema = Joi.object({
        Year: Joi.string().messages(),
        subjectNames1: Joi.string().messages(), 
        test1: Joi.string().messages(), exams1: Joi.string().messages(), subTotal1: Joi.string().messages(),

        subjectNames2: Joi.string().messages(), test2: Joi.string().messages(), exams2: Joi.string().messages(), subTotal2: Joi.string().messages(),

        subjectNames3: Joi.string().messages(), test3: Joi.string().messages(), exams3: Joi.string().messages(), subTotal3: Joi.string().messages(),

        subjectNames4: Joi.string().messages(), test4: Joi.string().messages(), exams4: Joi.string().messages(), subTotal4: Joi.string().messages(),

        subjectNames5: Joi.string().messages(),  test5: Joi.string().messages(), exams5: Joi.string().messages(), subTotal5: Joi.string().messages(),

        subjectNames6: Joi.string().messages(), test6: Joi.string().messages(), exams6: Joi.string().messages(), subTotal6: Joi.string().messages(),

        subjectNames7: Joi.string().messages(),  test7: Joi.string().messages(), exams7: Joi.string().messages(), subTotal7: Joi.string().messages(),

        subjectNames8: Joi.string().messages(),  test8: Joi.string().messages(), exams8: Joi.string().messages(), subTotal8: Joi.string().messages(),

        subjectNames9: Joi.string().messages(),  test9: Joi.string().messages(), exams9: Joi.string().messages(), subTotal9: Joi.string().messages(),

        subjectNames10: Joi.string().messages(), test10: Joi.string().messages(), exams10: Joi.string().messages(), subTotal10: Joi.string().messages(),

        resultTotal: Joi.string().messages(),
        teacherRemark: Joi.string().messages(), 
    });

    const {error} = schema.validate(req.body);

    if(error) {
        // Handle validator error
        const errorMessage = error.details.map(details => details.message).join(',');
        return res.status(400).json({error: errorMessage});
    }

    next();
};

module.exports = {validateResult};