const express = require("express")
const path = require("path")
const inventory = require('./db')
const orders = require('./order')
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
app.use(cors(corsOptions))

app.use('/images', express.static(path.join(__dirname, 'images')));

const drop_product = "DROP TABLE IF EXISTS Product"
const create_product = (
    "CREATE TABLE Product ( \
        id int NOT NULL AUTO_INCREMENT, \
        name varchar(255), \
        quantity int, \
        description text, \
        price double, \
        image_url varchar(255), \
        PRIMARY KEY (id) );"
)

const add_iPhone13 = (
"INSERT INTO Product (name, quantity, description, price, image_url) \
    VALUES \
    ( \
        'iPhone13', \
        100, \
        'The latest iPhone model with a powerful A15 Bionic chip and a stunning Super Retina XDR display', \
        799, \
        '/images/iphone13.jfif' \
    );"
)

const add_SamsungGalaxyWatch4 = (
    "INSERT INTO Product (name, quantity, description, price, image_url) \
    VALUES \
    ( \
        'Samsung Galaxy Watch 4', \
        100, \
        'A feature-packed smartwatch with health and fitness tracking, AMOLED display, and long battery life', \
        249, \
        '/images/galaxywatch4.jfif' \
    );"
)

const add_SonyWH1000XM4Headphones =
    "INSERT INTO Product (name, quantity, description, price, image_url) \
    VALUES \
    ( \
        'Sony WH-1000XM4 Headphones', \
        100, \
        'Premium noise-canceling headphones with excellent sound quality and all-day comfort', \
        349, \
        '/images/sonyheadphones.jfif' \
    );"

const add_InstantPotDuoEvoPlus =
"INSERT INTO Product (name, quantity, description, price, image_url) \
VALUES \
( \
    'Instant Pot Duo Evo Plus', \
    100, \
    'A versatile multicooker that can pressure cook, sauté, steam, and more, making meal prep a breeze', \
    349, \
    '/images/instantpot.jfif' \
);"

const add_NintendoSwitch =
"INSERT INTO Product (name, quantity, description, price, image_url) \
VALUES \
( \
    'Nintendo Switch', \
    100, \
    'A popular gaming console that offers both portable and TV modes for gaming on the go or at home', \
    299, \
    '/images/nintendoswitch.jfif' \
);"

app.get("/init_product_table", function(req, res){
    console.log("Received GET request for /init_product_table ... ")
    inventory.query(drop_product)
    inventory.query(create_product)
    inventory.query(add_iPhone13)
    inventory.query(add_SonyWH1000XM4Headphones)
    inventory.query(add_SamsungGalaxyWatch4)
    inventory.query(add_NintendoSwitch)
    inventory.query(add_InstantPotDuoEvoPlus)
    console.log(" ...Completed GET request for /init_product_table!")
})

app.get("/get_product", function(req, res){
    console.log("Received GET request for /get_product ...")
    const result = inventory.query('select * from Product')
    console.log(" ... Completed GET request for /get_product!")
    return res.send(result)
})

app.post("/update_quantity", function(req, res) {
    const order = req.body;
    const IDs = order.productName;
    const quantities = order.buyQuantity;

    console.log("Received POST request with data: IDs =", IDs, "quantities =", quantities);

    const updatePromises = [];

    IDs.forEach((id, index) => {
      const currentQuantity = quantities[index];
      const sql = `UPDATE Product SET quantity = quantity - ${currentQuantity} WHERE name = '${id}';`;
      console.log("Executing SQL:", sql);

      updatePromises.push(inventory.query(sql));
    });

    Promise.all(updatePromises)
      .then(() => {
        console.log("Quantities updated successfully");
        res.send('UPDATE PRODUCT QUANTITIES');
      })
      .catch((error) => {
        console.error('Failed to update quantities:', error);
        res.status(500).send('Failed to update quantities');
      });
  });



  app.post("/create_order", function(req, res){
    const order = req.body;
    const IDs = ['Sony WH-1000XM4 Headphones Quantity', 'Nintendo Switch Quantity', 'Instant Pot Duo Evo Plus Quantity', 'iPhone13 Quantity', 'Samsung Galaxy Watch 4 Quantity'];
    const quantities = order.buyQuantity;
    const orderID = order.orderID;

    const add_order = (
        `INSERT INTO Orders \
         (orderId, \`Sony WH-1000XM4 Headphones Quantity\`, \`Nintendo Switch Quantity\`, \`Instant Pot Duo Evo Plus Quantity\`, \`iPhone13 Quantity\`, \`Samsung Galaxy Watch 4 Quantity\`) \
         VALUES \
         (${orderID}, 0, 0, 0, 0, 0);`
    );

    orders.query(add_order);

    IDs.forEach((id, index) => {
        const currentQuantity = quantities[index];
        const sql = `UPDATE Orders SET \`${id}\` = ${currentQuantity} WHERE orderId = ${orderID}`;
        console.log("Executed SQL:", sql);
        orders.query(sql);
    });
});


