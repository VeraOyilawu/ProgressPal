const mongoose = require("mongoose")

const resultSchema = new mongoose.Schema({
    Year: {
        type: String,
    },

    subjectNames1: {
        type: String,
    },
    classAssesement: {
        type: String,
    },
    test1: {
        type: String,
    },
    exams1: {
        type: Number,
    },
    subTotal1: {
        type: Number,
    },

    subjectNames2: {
        type: String,
    },
    test2: {
        type: String,
    },
    exams2: {
        type: String,
    },
    subTotal2: {
        type: String,
    },

    subjectNames3: {
        type: String,
    },
    test3: {
        type: String,
    },
    exams3: {
        type: String,
    },
    subTotal3: {
        type: String,
    },

    subjectNames4: {
        type: String,
    },
    test4: {
        type: String,
    },
    exams4: {
        type: String,
    },
    subTotal4: {
        type: String,
    },

    subjectNames5: {
        type: String,
    },
    test5: {
        type: String,
    },
    exams5: {
        type: String,
    },
    subTotal5: {
        type: String,
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
