const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: [true, "studentName is required"],
    }, 

    email: {
        type: String,
        required: [true, "email is required"],
    },
    studentImage: {
        type: String,
        default: "StudentAvatar"
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "paasword is required"]
    },
    parentEmail: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "teacherDetails"  
    },
    result: [{
        type: mongoose.Schema.Types.ObjectId,
         ref: "results"  
    }],
    token: {
        type: String
    }
}, {timestamps: true})

const studentModel = mongoose.model("studentDetails", studentSchema)

module.exports = studentModel