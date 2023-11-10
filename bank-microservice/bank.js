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
    console.log('RUNNING ON http://localhost:8000')
})

app.post('/can_pay', (req, res) => {
    const info = req.body
    const companyName = info.companyName
    const companyNumber = info.companyNumber
    const customerName = info.customerName
    const customerCardNum = info.customerCardNum
    const customerExpDate = info.customerExpDate
    const customerCVV = info.customerCVV
    const totalCost = info.totalCost
    
    const confirmationString = "Payment succeeded. Bussiness with name " 
     + companyName + " and company number " + companyNumber + ". Customer with name " + customerName
     + " and credit card info: " + customerCardNum + ", " + customerExpDate + ", " + customerCVV
     + ". Total cost of order: $" + totalCost + "."
    console.log(confirmationString)
    res.status(200).send((Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)).toString())
})