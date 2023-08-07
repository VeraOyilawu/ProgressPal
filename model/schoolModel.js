const mongoose = require("mongoose")

const schoolSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: [true, "schoolName is required"],
    }, 

    email: {
        type: String,
        required: [true, "email is required"],
    },
    logo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        // required: true
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    password: {
        type: String,
        required: [true, "paasword is required"]
    },
    comfirmPassword: {
        type: String,
        required: [true, "paasword is required"]
    },
    regNo: {
        type: Number
    },
    website: {
        type: String
    },
    teacher: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacherDetails"  
    }],
    isAdmin: {
        type: Boolean,
       default: false
    },
    isSuperAdmin: {
       type: Boolean,
       default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    }
}, {timestamps: true})

const schoolModel = mongoose.model("schoolDetails", schoolSchema)

module.exports = schoolModel