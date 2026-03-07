var express = require('express'); 
var router = express.Router(); 
var mysql = require('mysql'); 
var con = mysql.createConnection({ 
host: "localhost", 
user: "root", 
password: "", 
database: "db_milltrack" 
}); 
 
router.post('/', (req, res, next) => { 
    let category_id = req.body.id; 
    console.log(category_id); 
    let query = `SELECT * FROM tbl_product where category_id='${category_id}'`; 
    console.log(query); 
con.query(query,(err,rows) => { 
    if (err) throw err; 
    res.send(rows); 
    }); 
    }); 
    module.exports = router;