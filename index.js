//Load express module with `require` directive
var express = require('express')
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  // database: "examplemicroservicedb",
  password: "postgres",
  port: "5433"
});
var app = express()

//Define request response in root URL (/)
app.get('/', function (req, res) {
  pool.query(`SELECT * FROM prescription`,  (dberr, dbres) => {
    res.send(dbres.rows)
    }
  );
  
})

//Launch listening server on port 8081
app.listen(4000, function () {
  console.log('app listening on port 4000!')
})