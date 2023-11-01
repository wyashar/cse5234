const express = require("express")
const path = require("path")
const app = express()
const port = 7000
const cors = require('cors')
const AWS = require('aws-sdk')
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200
}

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
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
      TableName: 'Products',
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

    const orderId = orderData.orderId;
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
  const orderData = req.body;
  const params = {
    TableName: 'Products',
    Key: {
      id: productMap.get(orderData.name)
    }
  }

  docClient.get(params, (err, data) => {
    if (err) {
      console.error("Error retrieving data from the database: ", err)
      res.status(500).send("Error retrieving data from the database")
      return;
    }

    const initialQuantity = data.Item.quantity;
    const newQuantity = initialQuantity - orderData.buyQuantity;

    if (newQuantity < 0) {
        console.error(`Not enough stock available for ${orderData.name}`)
        res.status(400).json({ error: `Not enough stock available for ${orderData.name}.`, name: orderData.name });
        return;
    }

    const updateParams = {
      TableName: 'Products',
      Key: {
        id: productMap.get(orderData.name)
      },
      UpdateExpression: 'set quantity = :q',
      ExpressionAttributeValues: {
        ':q': newQuantity
      }
    }

    docClient.update(updateParams, (updateErr, updateData) => {
      if (updateErr) {
        console.error("Error updating quantity in the database: ", updateErr);
        res.status(500).send("Error updating quantity in the database");
      } else {
        res.status(200).send("Quantity updated successfully");
      }
    })
  })
})
