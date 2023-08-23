const jwt = require("jsonwebtoken");
const school = require("../model/schoolModel");


const authentication = async (req, res, next) => {
    try {
        const token = req.headers("authorization").replace("Bearer", "")
        if (!token) {
            return res.status(404).json({
                message: "No authorization token"
            })
        }
        const decodeToken = await jwt.sign( { email, password, _id }, process.env.secret, { expiresIn: "5m" } );
       
        const isSuperAdmin = await school.findOne({email: decodeToken._id.isVerified ===true})

        if (!isSuperAdmin) {
            res.status(404).json({
                message: "you are not authorized to perform this function"
            })
        } else {
            next()
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}




const authenticagggytion = async (req, res, next) => {
    try {
        const token = req.headers("authorization").replace("Bearer", "")
        if (!token) {
            return res.status(404).json({
                message: "No authorization token"
            })
        }
        const decodeToken = await jwt.sign( { email, password, _id }, process.env.secret, { expiresIn: "5m" } );
       
        const isSuperAdmin = await school.findOne({email: decodeToken._id.isVerified ===true})

        if (!isSuperAdmin) {
            res.status(404).json({
                message: "you are not authorized to perform this function"
            })
        } else {
            next()
        }
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}


// auth middleware

const isAdmin = async (req, res, next) => {
  try {
    if (req.school.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: "not an admin" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { isAdmin, authentication };


