const express = require("express")
const router = express.Router()
const upload = require("../utils/multer")
const { signOut, verifyEmail, resendVerificationEmail, logIn, forgetPassword, changePassword, signUp, addTeacher ,oneSchool, allSchool, updateSchool, deleteSchool } = require("../controller/schoolController")

const {superAdminValidation, isLoggedin} = require("../middleware/autorization")

const { validateSchool, validateEmail, validatelogIn, validateUpdate, } = require("../middleware/schoolValidation")


router.route("/").get((req, res) => {
    res.json("Welcome user to my authentication Homepage")
})

router.post("/signIn", validateSchool, signUp)
router.route("/verification/:token").get(verifyEmail)
router.route("/resendEmail").post(validateEmail ,resendVerificationEmail)
router.route("/login").post(validatelogIn, logIn)
router.route("/signOut/:id").post(isLoggedin, signOut)
router.route("/forgetPassword/:id").post(isLoggedin, validateEmail, forgetPassword)
router.route("/changepassword/:id").put(isLoggedin,changePassword)
router.route("/allSchools").get(isLoggedin, allSchool)
router.route("/oneSchool/:id").get(isLoggedin, oneSchool)
router.route("/updateSchool/:id").put(isLoggedin, validateUpdate, updateSchool)
router.route("/deleteSchool/:id").delete(isLoggedin,deleteSchool)
router.route("/addTeacher").post(isLoggedin, validateEmail, addTeacher)


module.exports = router