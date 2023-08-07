const express = require("express")
const router = express.Router()

const { createResult, AllResult } = require("../controller/resultController")

router.route("/").get((req, res) => {
    res.json("Welcome user to  progressPal Homepage")
})

router.route("/createResult/:id").post( createResult)
router.route("/AllResult").get( AllResult)

module.exports = router