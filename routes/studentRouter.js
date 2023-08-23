const express = require("express")
const router = express.Router()
const upload = require("../utils/multer")
const { createStudent, login, signOut, findAllStudent, changePassword, oneStudent, updateStudent,  deleteStudent } = require("../controller/studentController")

const { validateStudent, validatelogIn, validateEmail, validateUpdate } = require("../middleware/studentValidation")

router.route("/").get((req, res) => {
    res.json("Welcome user to  progressPal Homepage")
})

router.route("/createStudent/:id").post(validateStudent, createStudent)
router.route("/loginStudent").post(validatelogIn, login)
router.route("/signoutStudent/:id").post(signOut)
router.route("/changepassword/:id").put(validateEmail, changePassword)
router.route("/allStudent").get( findAllStudent)
router.route("/student/:id").get( oneStudent)
router.route("/student/:id").put(validateUpdate, updateStudent)
router.route("/student/:id").delete( deleteStudent)

module.exports = router