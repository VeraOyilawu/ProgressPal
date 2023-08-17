const express = require("express")
const router = express.Router()
const upload = require("../utils/multer")
const { signOut, verifyEmail, resendVerificationEmail, logIn, forgetPassword, changePassword, signUp, addTeacher ,oneSchool, allSchool, updateSchool, deleteSchool } = require("../controller/schoolController")

const {superAdminValidation, isLoggedin} = require("../middleware/autorization")

const {validateSchool} = require("../middleware/schoolValidation")


router.route("/").get((req, res) => {
    res.json("Welcome user to my authentication Homepage")
})

router.post("/signIn", validateSchool, signUp)
router.route("/verification/:token").get(verifyEmail)
router.route("/resendEmail").post(resendVerificationEmail)
router.route("/login").post(logIn)
router.route("/signOut/:id").post(signOut)
router.route("/forgetPassword/:id").post(forgetPassword)
router.route("/changepassword/:id").put(changePassword)
router.route("/allSchools").get(allSchool)
router.route("/oneSchool/:id").get(oneSchool)
router.route("/updateSchool/:id").put(updateSchool)
router.route("/deleteSchool/:id").delete(deleteSchool)
router.route("/addTeacher").post(addTeacher)


module.exports = router