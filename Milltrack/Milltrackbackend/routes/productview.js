var express = require('express'); 
var router = express.Router(); 
var mysql = require('mysql'); 
var con = mysql.createConnection({ 
host: "localhost", 
user: "root", 
password: "", 
database: "db_milltrack" 
}); 
 
router.get('/', (req, res, next) => {
    let query = `SELECT * FROM tbl_product p inner join tbl_category c on 
    p.category_id =c.category_id` ;
    con.query(query, (err, rows) => {
    if (err) throw err;
    res.send(rows);
    console.log(rows);
    });
    });
    module.exports = router;