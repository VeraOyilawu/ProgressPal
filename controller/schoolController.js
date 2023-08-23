const schoolModel = require("../model/schoolModel")
const teacherModel = require("../model/teacherModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const cloudinary = require("../utils/cloudinary")
const nodemailer = require("nodemailer");

const fs = require("fs")


const transport = nodemailer.createTransport({
    service: "Gmail",
    port: 2525,
    auth: {
      user: "alexandravera789@gmail.com",
      pass: "vzfzpgznmargflne"
    }
  });
  

const signUp = async(req, res) => {
    try {
        const {schoolName, email, address, password, country, regNo, comfirmPassword, state, website} = req.body 

        //with picture
        if (req.files) {
            const isEmail = await schoolModel.findOne({email})
        if (isEmail) {
            res.status(404).json({
                message: "This email already exist"
            })
        } else {
            if ( password !== comfirmPassword) {
                res.status(404).json({
                    message: "make sure your input password is the same with your comfirmed password"
                })
            } 
        else {
                const salt = bcrypt.genSaltSync(10)
                const harshPassword = bcrypt.hashSync(password, salt)

                const logoImage = await cloudinary.uploader.upload(req.files.logo.tempFilePath)
        
                const body = await new schoolModel({
                    schoolName: schoolName.toUpperCase(),
                    email, 
                    logo: logoImage.secure_url,
                    address,
                    state,
                    country, 
                    password: harshPassword,
                    comfirmPassword: harshPassword,
                    regNo,
                    website
                })
                const token = await jwt.sign( { email, password, id }, process.env.secret, { expiresIn: "5m" } );
        
                const baseUrl = process.env.BASE_URL
                const mailOptions = {
                    from: process.env.SENDER_EMAIL,
                    to: email,
                    subject: "ProgressPal - Please verify your account",
                    html: `Please click on the link to verify your email: <a href="${baseUrl}/users/verify-email/${ token }">Verify Email</a>,`
                };
        
                await transport.sendMail(mailOptions);

                const savedSchool = await body.save();
        
                res.status(201).json({
                    message: "school created sucessfully",
                    data: savedSchool
                })
            }
        }

          //without picture
        } else {
            const isEmail = await schoolModel.findOne({email})
        if (isEmail) {
            res.status(404).json({
                message: "This email already exist"
            })
        } else {
            if ( password !== comfirmPassword) {
                res.status(404).json({
                    message: "make sure your input password is the same with your comfirmed password"
                })
            } 
        else {
                const salt = bcrypt.genSaltSync(10)
                const harshPassword = bcrypt.hashSync(password, salt)

                const studentDetails = await schoolModel.create(req.body)

                studentDetails.schoolName = schoolName.toUpperCase()
                studentDetails.password = harshPassword
                studentDetails.comfirmPassword = harshPassword

                const token = await jwt.sign( { email, password }, process.env.secret, { expiresIn: "5m" } );
        
                const baseUrl = process.env.BASE_URL
                const mailOptions = {
                    from: process.env.SENDER_EMAIL,
                    to: email,
                    subject: "ProgressPal - Please verify your account",
                    html: `Please click on the link to verify your email: <a href="${baseUrl}/users/verify-email/${ token }">Verify Email</a>,`
                };
        
                await transport.sendMail(mailOptions);

                const savedSchool = await studentDetails.save();
        
                res.status(201).json({
                    message: "school created sucessfully",
                    data: savedSchool
                })
            }
        }
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const { email } = jwt.verify( token, process.env.secret );

        const school = await schoolModel.findOne( { email } );

        school.isVerified = true;

        await school.save();

        const updatedSchool = await schoolModel.findOneAndUpdate( {email}, school );

        res.status( 200 ).json( {
            message: "school verified successfully",
            data: updatedSchool,
        })

    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        })
    }
}

// resend verification
const resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const school = await schoolModel.findOne( { email } );
        if ( !school ) {
            return res.status( 404 ).json( {
                error: "school not found"
            } );
        }

            const token = await jwt.sign( { email }, process.env.secret, { expiresIn: "50m" } );
            
            const baseUrl = process.env.BASE_URL
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: school.email,
                subject: "ProgressPal - Email Verification",
                html: `Please click on the link to verify your email: <a href="http://localhost:4080/api/users/verify-email/${ token }">Verify Email</a>`,
            };

            await transport.sendMail( mailOptions );

        res.status( 200 ).json( {
            message: `Verification email sent successfully to your email: ${school.email}`
        } );

    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        })
    }
}
const logIn = async(req, res)=>{
    try {
        const { email, password } = req.body;
        const user = await schoolModel.findOne({email}).populate("teacher");
        if (!user) {
            res.status(404).json({
                message: 'School not found'
            });
        } else {
            if(!user.isVerified) {
                res.status(400).json({
                    message: `School: ${user.schoolName} not verified.`
                })
            } else {
                const isPassword = await bcrypt.compare(password, user.comfirmPassword);
                if(!isPassword) {
                    res.status(400).json({
                        message: 'Incorrect Password'
                    });
                } else {
                    const token = await jwt.sign( {email }, process.env.secret, { expiresIn: "50m" } );
                   
                    res.status(200).json({
                        message: 'Log in Successful',
                        data: user,
                        token: token
                    });
                }
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
        
        const school = await schoolModel.findByIdAndUpdate(id, {token:null}, {new:true});
        if(!school) {
            return res.status(404).json({
                message: "school not found",
            });
        }
        res.status(200).json({
            message: "school logged out successfully",
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
        const school = await schoolModel.findById(id)

        if (!school.token) {
            return res.status(401).json({
                message: "school is not signed in"
            })
        }

        const { password } = req.body
        const saltedRound = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltedRound)
        const bodyData = {
            password: hashedPassword
        }

        const changePassword = await schoolModel.findByIdAndUpdate(id, bodyData, {new:true})
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
        const id = await schoolModel.findById(req.params.id)
        const { email } = req.body;
        const emailer = await schoolModel.findOne({email})

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

// jwt.decode()

const addTeacher = async(req, res) => {
    try {
        const { email } = req.body
        
        const baseUrl = process.env.BASE_URL
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "ProgressPal - Please verify your account",
            html: `Please click on the link to verify your email: <a href="http://localhost:4080/api/createTeacher/64c8f9444423ebc64f383f97/">Verify Email</a>`
        };

        await transport.sendMail(mailOptions);

        res.status(201).json({
            message: `EMAIL SENT TO ${email} SUCESSFULLY`,
        })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const updateSchool = async(req, res) => {
    try {
        const schoolId = req.params.id
        const school = await schoolModel.findById(schoolId)

         if (!schoolId) {
            res.status(404).json({
                message: "this school those not exist"
            })
         } else {

            const {schoolName, email, address, logo, password } = req.body;

            const schoolBody = {
                schoolName: schoolName || school.schoolName,
                email: email || school.email,
                address: address || school.address,
                logo: logo || school.logo,
                password: password || school.password
            }
  
            const updatedSchool = await schoolModel.findByIdAndUpdate(schoolId, schoolBody, {new: true})
            res.status(200).json({
                message: `${school.schoolName} has been updated sucessfully`,
                data: updatedSchool
            })
         }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const deleteSchool = async(req, res) => {
    try {
        const schoolId = req.params.id
        const school = await schoolModel.findById(schoolId)
        if (!school) {
            res.status(404).json({
                message: `${school} not found`,
            }) 
        } else {
            res.status(404).json({
                message: `${school.schoolName} deleted sucessfully`,
                data: school
            })
        }
        const dletedSchool = await schoolModel.findByIdAndDelete(school)
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const allSchool = async(req, res) => {
    try {
        const schools = await schoolModel.find()
        if (!schools) {
            res.status(404).json({
                message: "No school found"
            })
        } else {
            res.status(200).json({
                message: "school s available are "+ schools.length,
                data: schools
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}

const oneSchool = async(req, res) => {
    try {
        const schoolId = req.params.id
        const school = await schoolModel.findById(schoolId)

        if (!school) {
            res.status(404).json({
                message: `${school} not found`,
            })
        } else {
            res.status(200).json({
                message: `school found`,
                data: school
            })
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}


module.exports = {
    signUp,
    verifyEmail,
    resendVerificationEmail,
    logIn,
    signOut,
    changePassword,
    forgetPassword,
    addTeacher,
    oneSchool,
    allSchool,
    updateSchool,
    deleteSchool
}

