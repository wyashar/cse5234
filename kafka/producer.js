const fs = require('fs');
const Kafka = require("node-rdkafka");
const express = require("express")
const path = require("path")
const app = express()
const port = 5000
const cors = require('cors')

const corsOptions = {
    origin: "http://localhost:5000",
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())
app.listen(port, () => {
    console.log('RUNNING ON http://localhost:5000')
})

const readConfigFile = (fileName) => {
    const data = fs.readFileSync(fileName, 'utf8').toString().split("\n");
    return data.reduce((config, line) => {
        const [key, value] = line.split("=");
        if (key && value) {
            config[key] = value;
        }
        return config;
    }, {})
}

const sendShippingMessage = (topic, value, key) => {
    const producer = new Kafka.Producer(readConfigFile("client.properties"));
    producer.connect();
    producer.on("ready", () => {
        console.log("hello")
        producer.produce(topic, -1, Buffer.from(value), Buffer.from(key));
    });
}

app.post('/send_shipping', (req, res) => {
    sendShippingMessage("ShippingCo", "CSE5234LLC wants to initiate shipping", "key");
    res.status(200).json({ message: 'Shipping message sent successfully.' });
})
