const express = require("express")
const db = require('./db')
const app = express()
const port = 7000
const cors = require('cors')

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200
}
app.use(express.json())
app.listen(port, () => {
    console.log('RUNNING ON http://localhost:7000')
})
app.get("/", function(req, res){
    res.send("HELLO!")
})
