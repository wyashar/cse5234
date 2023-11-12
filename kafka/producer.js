const fs = require('fs');
const Kafka = require("node-rdkafka");

function readConfigFile(fileName) {
    const data = fs.readFileSync(fileName, 'utf8').toString().split("\n");
    return data.reduce((config, line) => {
        const [key, value] = line.split("=");
        if (key && value) {
            config[key] = value;
        }
        return config;
    }, {})
}

const producer = new Kafka.Producer(readConfigFile("client.properties"));
producer.connect();
producer.on("ready", () => {
    console.log("hello")
    producer.produce("ShippingCo", -1, Buffer.from("value"), Buffer.from("key"));
});
