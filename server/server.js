const express = require("express")
const db = require('./db')
const app = express()
const port = 7000
const cors = require('cors')

const drop_product = "DROP TABLE IF EXISTS Product"
const create_product = (
    "CREATE TABLE Product ( \
        id int NOT NULL AUTO_INCREMENT, \
        name varchar(255), \
        quantity int, \
        description text, \
        price double, \
        PRIMARY KEY (id) );"
)

const add_iPhone13 = (
"INSERT INTO Product (name, quantity, description, price) \
    VALUES \
    ( \
        'iPhone13', \
        100, \
        'The latest iPhone model with a powerful A15 Bionic chip and a stunning Super Retina XDR display', \
        799 \
    );"
)

const add_SamsungGalaxyWatch4 = (
    "INSERT INTO Product (name, quantity, description, price) \
    VALUES \
    ( \
        'Samsung Galaxy Watch 4', \
        100, \
        'A feature-packed smartwatch with health and fitness tracking, AMOLED display, and long battery life', \
        249 \
    );"
)

const add_SonyWH1000XM4Headphones =
    "INSERT INTO Product (name, quantity, description, price) \
    VALUES \
    ( \
        'Sony WH-1000XM4 Headphones', \
        100, \
        'Premium noise-canceling headphones with excellent sound quality and all-day comfort', \
        349 \
    );"

const add_InstantPotDuoEvoPlus =
"INSERT INTO Product (name, quantity, description, price) \
VALUES \
( \
    'Instant Pot Duo Evo Plus', \
    100, \
    'A versatile multicooker that can pressure cook, sauté, steam, and more, making meal prep a breeze', \
    349 \
);"

const add_NintendoSwitch =
"INSERT INTO Product (name, quantity, description, price) \
VALUES \
( \
    'Nintendo Switch', \
    100, \
    'A popular gaming console that offers both portable and TV modes for gaming on the go or at home', \
    299 \
);"

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(express.json())
app.listen(port, () => {
    console.log('RUNNING ON http://localhost:7000')
})
app.get("/get_product", function(req, res){
    db.query(drop_product)
    db.query(create_product)
    db.query(add_iPhone13)
    db.query(add_SonyWH1000XM4Headphones)
    db.query(add_SamsungGalaxyWatch4)
    db.query(add_NintendoSwitch)
    db.query(add_InstantPotDuoEvoPlus)
    const result = db.query('select * from Product')
    return res.send(result)
})

app.post("/update_quantity", function(req, res) {
    let IDs = req.body.names;
    let quantities = req.body.buyQuantity;

    console.log("Received POST request with data: IDs =", IDs, "quantities =", quantities);

    const updatePromises = [];

    IDs.forEach((id, index) => {
      const currentQuantity = quantities[index];
      const sql = `UPDATE Product SET quantity = ${currentQuantity} WHERE id = ${id};`;
      console.log("Executing SQL:", sql);

      updatePromises.push(db.query(sql));
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
