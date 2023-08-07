const express = require("express")
const router = express.Router()
const upload = require("../utils/multer")
const { createTeacher, signOut, login, forgetPassword, changePassword, findAllTeachers, OneTeacher, updateTeacher, deleteTeacher } = require("../controller/teacherController")
const { superAdminValidation } = require("../middleware/autorization")


router.route("/").get((req, res) => {
    res.json("Welcome user to  progressPal Homepage")
})

router.route("/createTeacher/:id").post(upload.single("profile"), createTeacher)
router.route("/loginTeacher").post(login)
router.route("/signotTeacher/:id").post(signOut)
router.route("/forgetPassword/:id").post(forgetPassword)
router.route("/changepassword/:id").put(changePassword)
router.route("/allTeachers").get( findAllTeachers)
router.route("/teacher/:id").get( OneTeacher)
router.route("/updateTeacher/:id").patch( updateTeacher)
router.route("/deleteTeacher/:id").delete(superAdminValidation, deleteTeacher)

module.exports = router