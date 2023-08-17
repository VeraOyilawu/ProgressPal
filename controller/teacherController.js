const schoolModel = require("../model/schoolModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const cloudinary = require("../utils/cloudinary")
const nodemailer = require("nodemailer");
const fs = require("fs")
const teacherModel = require("../model/teacherModel")


const createTeacher = async(req, res) => {
    try {
        const school = await schoolModel.findById(req.params.id)
        if (!school) {
            console.log("School not found.");
            return res.status(404).json({
                message: "School not found",
            });
        }
            const {teacherName, email, addresss, subject, password, comfirmPassword} = req.body

            if (req.files) {
                if (password !== comfirmPassword) {
                    res.status(404).json({
                        message: "your password and your confirm password must be the same"
                    })
                } else {
                    const isEmail = await teacherModel.findOne({email})
                    if (!isEmail) {
                        res.status(404).json({
                            message: "This email already exist"
                        })
                      
                    } else {
                        const salt = bcrypt.genSaltSync(10)
                    const harshPassword = bcrypt.hashSync(password, salt)
    
                    
                    const teacherprofile = await cloudinary.uploader.upload(req.files.profile.tempFilePath)
    
                    const body = new teacherModel({
                        teacherName,
                        email, 
                        profile:teacherprofile.secure_url ,
                        addresss, 
                        subject, 
                        school,
                        password: harshPassword, 
                        confirmPassword: harshPassword
                    })
    
                    const token = await jwt.sign( { email }, process.env.secret, { expiresIn: "5m" } );
    
                    const savedTeacher = await body.save();
                    school.teacher.push(savedTeacher)
                    school.save()
                    savedTeacher.save()
                    res.status(201).json({
                        message: "teacher created sucessfully",
                        data: savedTeacher
                    })
                    }
                }
            } else {
                if (password !== comfirmPassword) {
                    res.status(404).json({
                        message: "your password and your confirm password must be the same"
                    })
                } else {
                    const isEmail = await teacherModel.findOne({email})
                    if (!isEmail) {
                        res.status(404).json({
                            message: "This email already exist"
                        })
                      
                    } else {
                        const salt = bcrypt.genSaltSync(10)
                    const harshPassword = bcrypt.hashSync(password, salt)
                    
                    const teacherDetails = await teacherModel.create(req.body)

                    teacherDetails.teacherName = teacherName.toUpperCase()
                    teacherDetails.email = teacherName.toLowerCase()
                    teacherDetails.password = harshPassword
                    teacherDetails.confirmPassword = harshPassword
    
                    const token = await jwt.sign( { email }, process.env.secret, { expiresIn: "5m" } );
    
                    const savedTeacher = await teacherDetails.save();
                    school.teacher.push(savedTeacher)
                    school.save()
                    savedTeacher.save()
                    res.status(201).json({
                        message: "teacher created sucessfully",
                        data: savedTeacher
                    })
                    }
                }
            }
            
           
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}


const login = async(req, res)=>{
    try {
        const { email, password } = req.body;
        const teacher = await teacherModel.findOne({email}).populate("student")
        if (!teacher) {
            res.status(404).json({
                message: 'teacher not found'
            });
            } else {
                const isPassword = await bcrypt.compare(password, teacher.password);
                if(!isPassword) {
                    res.status(400).json({
                        message: 'Incorrect Password'
                    });
                } else {
                    const token = await jwt.sign( {email }, process.env.secret, { expiresIn: "50m" } );
                   
                    res.status(200).json({
                        message: 'Log in Successful',
                        data: teacher,
                        token: token
                    });
                }
            } 
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

const signOut = async(req, res) =>{
    try {
        const id = req.params.id;
        
        const teacher = await teacherModel.findByIdAndUpdate(id, {token:null}, {new:true});
        if(!teacher) {
            return res.status(404).json({
                message: "teacher not found",
            });
        }
        res.status(200).json({
            message: "teacher logged out successfully",
        })
    } catch (error) {
        res.status(500).json({
            Error:error.message,
        })
    }
}


const changePassword = async(req, res) => {
    try {
        const id = req.params.id
        const teacher = await teacherModel.findById(id)

        if (!teacher.token) {
            return res.status(401).json({
                message: "teacher is not signed in"
            })
        }

        const { password } = req.body
        const saltedRound = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltedRound)
        const bodyData = {
            password: hashedPassword
        }

        const changePassword = await teacherModel.findByIdAndUpdate(id, bodyData, {new:true})
        return res.status(201).json({
            message: "password changed suceesfully"
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
  }

const forgetPassword = async(req, res) => {
    try {
        const id = await teacherModel.findById(req.params.id)
        const { email } = req.body;
        const emailer = await teacherModel.findOne({email})

        if (!emailer) {
         res.status(404).json({
        message: "This email does not exist"
        })
       } else {
       const token = await jwt.sign( { email }, process.env.secret, { expiresIn: "50m" } );
            
       const baseUrl = process.env.BASE_URL
       const mailOptions = {
           from: process.env.SENDER_EMAIL,
           to: emailer.email,
           subject: "ProgressPal - Reset Password",
           html: `Please click on the link to verify your email: <a href="http://localhost:4080/api/changePassword/${emailer._id}/this${ token }">Verify Email</a>`,
        };
 
        await transport.sendMail( mailOptions );
        res.status(201).json({
            message: `An email has been sent to ${email} `
        })
      }
    } catch (error) {
       res.status(404).json({
        message: error.message
       }) 
    }
}

const findAllTeachers = async(req, res) => {
    try {
        const teachers = await teacherModel.find().populate("student")
        if (!teachers) {
            res.status(404).json({
                message: "no teacher available"
            })
        } else {
            res.status(200).json({
                message: "teacher available are "+ teachers.length,
                data: teachers
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const OneTeacher = async(req, res) => {
    try {
        const {id} = req.params
        const teacher = await teacherModel.findById(id).populate("student")
        if (!teacher) {
            return res.status(404).json({
                message: "teacher not found"
            })
        } else {
            res.status(200).json({
                message: "The teacher",
                data: teacher
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}


const updateTeacher = async (req, res) => {
    try {
        const {id} = req.params
        const teacher = await teacherModel.findById(id)

        if (!teacher) {
            res.status(404).json({
                message: "teacher not found"
            })
        } else {
          const { teacherName, email, address, profile, subject, password} = req.body
          const teacherBody = {
            teacherName:teacherName || teacherName.email, 
            email:email || teacher.email, 
            address:address  || teacher.address,  
            profile:profile  || teacher.profile,  
            subject:subject  || teacher.subject,  
            password:password  || teacher.password,  
          }
      
        const updatedTeacher = await teacherModel.findByIdAndUpdate(id, teacherBody, {new: true})
       
        res.status(200).json({
            message: `${teacher.teacherName} updated sucessfully`,
            data: updatedTeacher
        })
        }
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}

const deleteTeacher = async(req, res) => {
    try {
        const { id } = req.params
        const teacher = await teacherModel.findById(id)

        if (!teacher) {
            res.status(404).json({
                message: "teacher not found"
            })
        } else {
            await teacherModel.findByIdAndDelete(id)
            res.status(200).json({
                message: `${teacher.teacherName} deleted sucessfully`
            }) 
        }
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }
}



module.exports = {
    createTeacher,
    login,
    signOut,
    changePassword,
    forgetPassword,
    findAllTeachers,
    OneTeacher,
    updateTeacher,
    deleteTeacher
}