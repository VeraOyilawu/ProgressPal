const express = require("express")
const router = express.Router()
const upload = require("../utils/multer")
const { signOut, verifyEmail, resendVerificationEmail, logIn, forgetPassword, changePassword, signUp, addTeacher } = require("../controller/schoolController")


router.route("/").get((req, res) => {
    res.json("Welcome user to my authentication Homepage")
})

router.route("/signIn").post(upload.single("logo"), signUp)
router.route("/verification/:token").get(verifyEmail)
router.route("/resendEmail").post(resendVerificationEmail)
router.route("/login").post(logIn)
router.route("/signOut/:id").post(signOut)
router.route("/forgetPassword/:id").post(forgetPassword)
router.route("/changepassword/:id").put(changePassword)
router.route("/addTeacher").post(addTeacher)

module.exports = router