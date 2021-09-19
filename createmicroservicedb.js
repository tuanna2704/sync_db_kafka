const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  // database: "examplemicroservicedb",
  password: "postgres",
  port: "5433"
});

pool.query(
  `CREATE DATABASE examplemicroservicedb`,
  (err, res) => {
    if (res) {
      console.log('Create DB success');
      const textCreateTable = 'CREATE TABLE prescription (prescription_id int, user_id int, prescription_stock varchar(8), prescription_quantity int,datetime_created timestamp, datetime_updated timestamp, primary key(prescription_id));'
      pool.query(textCreateTable, (err, res) => {
        // const textInsert = "INSERT INTO prescription(prescription_id, user_id, prescription_stock, prescription_quantity, datetime_created, datetime_updated)VALUES(1, 10, 20, 20, NOW(), NOW())";
        // pool.query(textInsert, (err, res) => {
        //   const textSelect = "SELECT * FROM prescription"
        //   pool.query(textSelect, (err, res) => {
            // console.log(err, res)
            console.log('CREATE TABLE SUCCESS');
            pool.end();
        //   })
        // })
      })
    } else {
      console.log(err, res)
    }
  }
);