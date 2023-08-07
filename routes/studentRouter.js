const express = require("express")
const router = express.Router()
const upload = require("../utils/multer")
const { createStudent, login, signOut, findAllStudent, changePassword } = require("../controller/studentController")
const { superAdminValidation } = require("../middleware/autorization")


router.route("/").get((req, res) => {
    res.json("Welcome user to  progressPal Homepage")
})

router.route("/createStudent/:id").post(upload.single("studentImage"), createStudent)
router.route("/loginStudent").post(login)
router.route("/signoutStudent/:id").post(signOut)
router.route("/changepassword/:id").put(changePassword)
router.route("/allStudent").get( findAllStudent)

module.exports = router