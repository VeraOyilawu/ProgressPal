const express = require("express")
const router = express.Router()
const upload = require("../utils/multer")
const { createTeacher, signOut, login, forgetPassword, changePassword, findAllTeachers, OneTeacher, updateTeacher, deleteTeacher } = require("../controller/teacherController")

// const { superAdminValidation } = require("../middleware/autorization")

const {validateTeacher, validatelogIn, validateEmail, validateUpdate} = require("../middleware/teacherValidation")

router.route("/").get((req, res) => {
    res.json("Welcome user to  progressPal Homepage")
})

router.route("/createTeacher/:id").post(validateTeacher, createTeacher)
router.route("/loginTeacher").post(validatelogIn, login)
router.route("/signotTeacher/:id").post(signOut)
router.route("/forgetPassword/:id").post(validateEmail, forgetPassword)
router.route("/changepassword/:id").put(validateEmail, changePassword)
router.route("/allTeachers").get( findAllTeachers)
router.route("/teacher/:id").get( OneTeacher)
router.route("/updateTeacher/:id").patch(validateUpdate, updateTeacher)
router.route("/deleteTeacher/:id").delete(deleteTeacher)

module.exports = router