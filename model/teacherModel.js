const mongoose = require("mongoose")

const teacherSchema = new mongoose.Schema({
    teacherName: {
        type: String,
        required: [true, "teacherName is required"],
    }, 

    email: {
        type: String,
        required: [true, "email is required"],
    },
    profile: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "paasword is required"]
    },
    confirmPassword: {
        type: String,
        required: [true, "paasword is required"]
    },
    subject: {
        type: String
    },
    student:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "studentDetails"  
    }],
    school:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "schoolDetails"  
    },
    token: {
        type: String
    }
}, {timestamps: true})

const teacherModel = mongoose.model("teacherDetails", teacherSchema)

module.exports = teacherModel