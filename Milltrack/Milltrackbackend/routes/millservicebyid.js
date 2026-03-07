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
    let login_id = req.body.login_id; 
    let query = `SELECT * FROM tbl_servicecategory sc inner join tbl_category c on c.category_id =sc.category_id 
     where sc.mill_id='${login_id}'`; 
    console.log(query); 
con.query(query,(err,rows) => { 
    if (err) throw err; 
    res.send(rows); 
    }); 
    }); 
    
    module.exports = router;