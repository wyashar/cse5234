const express = require("express")
const path = require("path")
const app = express()
const port = 8000
const cors = require('cors')

const corsOptions = {
    origin: "http://localhost:7000",
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())
app.listen(port, () => {
    console.log('RUNNING ON http://locatlhost:8000')
})

app.post('/can_pay', (req, res) => {
    const info = req.body
    const companyName = info.companyName
    const companyNumber = info.companyNumber
    const customerName = info.customerName
    const customerCardNum = info.customerCardNum
    const customerExpDate = info.customerExpDate
    const customerCVV = info.customerCVV
    
    const confirmationString = "Payment succeeded. Bussiness with name " 
     + companyName +" with numnber " + companyNumber + " and customer named :" + customerName
     + "with credit card info " + customerCardNum + ", " + customerExpDate + ", " + customerCVV

     res.status(200).send(confirmationString)
})