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
        default: "SchoolAvatar"
    },
    address: {
        type: String,
        required: [true, "address is required"],
    },
    password: {
        type: String,
        required: [true, "paasword is required"]
    },
    state: {
        type: String,
        default: "state"
    },
    country: {
        type: String,
        default: "Nigeria"
    },
    regNo: {
        type: String,
        default: "12345"
    },
    website: {
        type: String,
        default: "www.School.com"
    },
    comfirmPassword: {
        type: String,
        required: [true, "paasword is required"]
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