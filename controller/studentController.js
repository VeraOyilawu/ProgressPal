const studentModel = require("../model/studentModel")
const teacherModel = require("../model/teacherModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const cloudinary = require("../utils/cloudinary")
const nodemailer = require("nodemailer");
const fs = require("fs")


const createStudent = async(req, res) => {
    try {
        const teacher = await teacherModel.findById(req.params.id)
        if (!teacher) {
            return res.status(404).json({
                message: "teacher not found",
            });
        }
        const {studentName, email, addresss, parentEmail, password} = req.body

        if (req.files) {
            const isEmail = await studentModel.findOne({email})
            if (isEmail) {
                res.status(404).json({
                    message: "This email already exist"
                })
            } else {
                const salt = bcrypt.genSaltSync(10)
            const harshPassword = bcrypt.hashSync(password, salt)

            const studentprofile = await cloudinary.uploader.upload(req.files.studentImage.tempFilePath)

            const body = new studentModel({
                studentName,
                email, 
                studentImage : studentprofile.secure_url ,
                addresss, 
                parentEmail, 
                password: harshPassword, 
                confirmPassword: harshPassword
            })

            const token = await jwt.sign( { email }, process.env.secret, { expiresIn: "5m" } );

            const savedStudent = await body.save();
            teacher.student.push(savedStudent)
            teacher.save()
            savedStudent.save()

            res.status(201).json({
                message: "student created sucessfully",
                data: savedStudent
            })
        }
        } else {
            const isEmail = await studentModel.findOne({email})
            if (isEmail) {
                res.status(404).json({
                    message: "This email already exist"
                })
            } else {
                const salt = bcrypt.genSaltSync(10)
            const harshPassword = bcrypt.hashSync(password, salt)

            const studentDetails = await studentModel.create(req.body)

            studentDetails.studentName = studentName.toUpperCase()
            studentDetails.email = email.toLowerCase()
            studentDetails.password = harshPassword


            const token = await jwt.sign( { email }, process.env.secret, { expiresIn: "5m" } );

            const savedStudent = await studentDetails.save();
            teacher.student.push(savedStudent)
            teacher.save()
            savedStudent.save()

            res.status(201).json({
                message: "student created sucessfully",
                data: savedStudent
            })
        }
        }

          
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}
           

// const login = async(req, res)=>{
//     try {
//         const { email, password } = req.body;
        
//         const student = await studentModel.findOne({email}).populate("result")
//         if (!student) {
//             res.status(404).json({
//                 message: 'student not found'
//             });
//             } else {
//                 const isPassword = await bcrypt.compare(password, student.password);
//                 if(!isPassword) {
//                     res.status(400).json({
//                         message: 'Incorrect Password'
//                     });
//                 } else {
//                     const token = await jwt.sign( {email }, process.env.secret, { expiresIn: "50m" } );
                   
//                     res.status(200).json({
//                         message: 'Log in Successful',
//                         data: student,
//                         token: token
//                     });
//                 }
//             }
        
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// };


const login = async(req, res)=>{
    try {
        const { email, password } = req.body;
        
        const student = await studentModel.findOne({email}).populate("result")
        if (!student) {
            res.status(404).json({
                message: 'student not found'
            });
            } else {
                const isPassword = await bcrypt.compare(password, student.password);
                if(!isPassword) {
                    res.status(400).json({
                        message: 'Incorrect Password'
                    });
                } else {
                    const token = await jwt.sign( {email }, process.env.secret, { expiresIn: "50m" } );
                   
                    res.status(200).json({
                        message: 'Log in Successful',
                        data: student,
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
        
        const student = await studentModel.findByIdAndUpdate(id, {token:null}, {new:true});
        if(!student) {
            return res.status(404).json({
                message: "student not found",
            });
        }
        res.status(200).json({
            message: "student logged out successfully",
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
        const student = await studentModel.findById(id)

        if (!student.token) {
            return res.status(401).json({
                message: "student is not signed in"
            })
        } else {
            const { password } = req.body
            const saltedRound = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, saltedRound)
            const bodyData = {
                password: hashedPassword
            }
    
            const changePassword = await studentModel.findByIdAndUpdate(id, bodyData, {new:true})
            return res.status(201).json({
                message: "password changed suceesfully"
            })
        }

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
  }

  const findAllStudent = async(req, res) => {
    try {
        const student = await studentModel.find()
        if (!student) {
            res.status(404).json({
                message: "no student available"
            })
        } else {
            res.status(200).json({
                message: "student available are "+ student.length,
                data: student
            })
        }

    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}


const oneStudent = async(req, res) => {
    try {
        const studentId = req.params.id
        const student = await studentModel.findById(studentId)

        if (!student) {
            res.status(404).json({
                message: `${student} not found`,
            })
        } else {
            res.status(200).json({
                message: `${student.studentName}`,
                data: student
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const updateStudent = async(req, res) => {
    try {
        const studentId = req.params.id
        const student = await studentModel.findById(studentId)
         if (!student) {
            res.status(404).json({
                message: "this student those not exist"
            })
         } else {
            const { studentName, email, address, logo, password} = req.body
            const studentBody = {
                studentName: studentName || student.studentName,
                email: email || student.email,
                address: address || student.address,
                logo: logo || student.logo,
                password: password || student.password
            }
            const updatedStudent = await studentModel.findByIdAndUpdate(studentId, studentBody, {new: true})
            res.status(200).json({
                message: `${student.studentName} has been updated sucessfully`,
                data: updatedStudent
            })
         }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const deleteStudent = async(req, res) => {
    try {
        const studentId = req.params.id
        const student = await studentModel.findById(studentId)
        if (!student) {
            res.status(404).json({
                message: `${student} not found`,
            }) 
        } else {
            const deletedStudent = await studentModel.findByIdAndDelete(student)
            res.status(404).json({
                message: `${student.studentName} deleted sucessfully`,
                data: deletedStudent
            })
        }
       
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

module.exports = {
    createStudent,
    login,
    signOut,
    changePassword,
    findAllStudent,
    oneStudent,
    updateStudent,
    deleteStudent
}