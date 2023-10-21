var mySql = require("sync-mysql")
var connection = new mySql({
    host: "localhost",
    user: "root",
    database: "order"
})
module.exports = connection;
