const express = require("express")
const router = express.Router()

const { createResult, AllResult, deleteResult } = require("../controller/resultController")

const { validateResult } = require("../middleware/resultValidation")

router.route("/").get((req, res) => {
    res.json("Welcome user to  progressPal Homepage")
})

router.route("/createResult/:id").post(validateResult, createResult)
router.route("/AllResult").get( AllResult)
router.route("/deleteResult/:id").delete( deleteResult)

module.exports = router