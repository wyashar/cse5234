const express = require("express")
const path = require("path")
const app = express()
const port = 7000
const cors = require('cors')
const AWS = require('aws-sdk')

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200
}

AWS.config.update({
    accessKeyId: $accessKeyId,
    secretAccessKey: $secretAccessKey,
    region: 'us-east-2',
})
const docClient = new AWS.DynamoDB.DocumentClient();

app.use(cors(corsOptions))
app.use('/images', express.static(path.join(__dirname, '..', 'src', 'images')));
app.use(express.json())
app.listen(port, () => {
    console.log('RUNNING ON http://localhost:7000')
})


app.get('/products', (req, res) => {
    const params = {
      TableName: 'Products', // Replace with your table name
    }

    docClient.scan(params, (err, data) => {
      if (err) {
        console.error('Error', err);
        res.status(500).json({ error: 'Failed to fetch products from DynamoDB' });
      } else {
        console.log('Success', data);
        res.json(data.Items);
      }
    })
})

app.post('/create_order', (req, res) => {
    const orderData = req.body;

    const orderId = orderData.orderId; // Extract the orderId from the request body

    const params = {
      TableName: 'Orders',
      Item: {
        orderId: orderId,
        name: orderData.name,
        quantity: orderData.buyQuantity,
      },
    };

    docClient.put(params, (err) => {
      if (err) {
        console.error('Error', err);
        res.status(500).json({ error: 'Failed to create an order in DynamoDB' });
      } else {
        console.log('Order created successfully');
        res.json({ message: 'Order created successfully' });
      }
    });
  });

const productMap = new Map();
productMap.set("Sony WH-1000XM4 Headphones", 3);
productMap.set("Samsung Galaxy Watch 4", 2);
productMap.set("Instant Pot Duo Evo Plus", 4);
productMap.set("iPhone13", 1);
productMap.set("Nintendo Switch", 5);


app.post('/update_quantity', (req, res) => {
    //TODO: UPDATE QUANTITIES IN THE PRODUCT TABLE
  });

