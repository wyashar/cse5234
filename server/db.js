var mySql = require("sync-mysql")
var connection = new mySql({
    host: "localhost",
    user: "root",
    database: "db"
})
module.exports = connection;
