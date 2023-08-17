const mongoose = require("mongoose")

const resultSchema = new mongoose.Schema({
    Year: {
        type: String,
    },

    subjectNames1: {
        type: String,
    },
    classAssesement1: {
        type: Number,
    },
    test1: {
        type: Number,
    },
    exams1: {
        type: Number,
    },
    subTotal1: {
        type: Number,
    },

    subjectNames2 : {
        type: String,
    },
    classAssesement2 : {
        type: Number,
    },
    test2 : {
        type: Number,
    },
    exams2: {
        type: Number,
    },
    subTotal2: {
        type: Number,
    },

    subjectNames3 : {
        type: String,
    },
    classAssesement3 : {
        type: Number,
    },
    test3 : {
        type: Number,
    },
    exams3 : {
        type: Number,
    },
    subTotal3 : {
        type: Number,
    },

    subjectNames4: {
        type: String,
    },
    classAssesement4: {
        type: Number,
    },
    test4: {
        type: Number,
    },
    exams4: {
        type: Number,
    },
    subTotal4: {
        type: Number,
    },

    subjectNames5: {
        type: String,
    },
    classAssesement5: {
        type: Number,
    },
    test5: {
        type: Number,
    },
    exams5: {
        type: Number,
    },
    subTotal5: {
        type: Number,
    },
    classAssesement5: {
        type: Number,
    },

     subjectNames6: {
        type: String,
    },
    classAssesement6: {
        type: Number,
    },
    test6: {
        type: Number,
    },
    exams6: {
        type: Number,
    },
    subTotal6: {
        type: Number,
    },
   

    subjectNames7: {
        type: String,
    },
    classAssesement7: {
        type: Number,
    },
    test7: {
        type: Number,
    },
    exams7: {
        type: Number,
    },
    subTotal7: {
        type: Number,
    },
    

    subjectNames8: {
        type: String,
    },
    classAssesement8: {
        type: Number,
    },
    test8: {
        type: Number,
    },
    exams8: {
        type: Number,
    },
    subTotal8: {
        type: Number,
    },
   

    subjectNames9: {
        type: String,
    },
    classAssesement9: {
        type: Number,
    },
    test9: {
        type: Number,
    },
    exams9: {
        type: Number,
    },
    subTotal9: {
        type: Number,
    },


    subjectNames10: {
        type: String,
    },
    classAssesement10: {
        type: Number,
    },
    test10: {
        type: Number,
    },
    exams10: {
        type: Number,
    },
    subTotal10: {
        type: Number,
    },
   

    resultTotal: {
        type: String
    },
    teacherRemark: {
        type: String
    },

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students"
    }
    
}, {timestamps: true})

const resultModel = mongoose.model("results", resultSchema)
module.exports = resultModel
