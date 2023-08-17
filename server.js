const express = require("express")
const PORT = 4080
const db = require("./config/database")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const router = require("./routes/schoolRouter")
const route = require("./routes/teacherRouter")
const routes = require("./routes/studentRouter")
const rout = require("./routes/resultRouter")

const app = express()
app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.use(fileUpload({
    useTempFiles: true
}))
app.use("/uploads", express.static("uploads"))
app.use("/api", router)
app.use("/api", route)
app.use("/api", routes)
app.use("/api", rout)



app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`);
})

