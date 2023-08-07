const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const userModel = require("../model/schoolModel")

const authentication = async(req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id)
        const usertoken = user.token

        if(!usertoken){
            res.status(404).json({
                message: "token not found"
            })
        } else{
            await jwt.verify(usertoken,process.env.secret, (err,payLoad) => {
                if(err){
                    res.status(404).json({
                        message: err.message
                    })  
                } else {
                    req.user = payLoad
                    next()
                }
            })
        }

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const superAdminValidation = (req,res, next) => {
    authentication (req, res, async() => {
        const user = await userModel.findById(req.params.id)
        if(user.isSuperAdmin){
            next()
        } else {
            res.status(404).json({
                message: "you are not verified to perform this action"
            })
        }
    }) 
}

module.exports = {
    superAdminValidation
}