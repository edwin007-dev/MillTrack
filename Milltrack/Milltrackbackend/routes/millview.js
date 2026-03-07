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
    let location_id=req.body.location_id
    let query = `SELECT * FROM tbl_mill c INNER JOIN tbl_login g ON c.login_id = g.login_id WHERE g.status = 'requested' AND c.location_id = '${location_id}'`; 
    console.log(query); 
    con.query(query, (err, rows) =>  
    { 
    if (err) throw err; 
    res.send(rows); 
    }); 
    }); 
    module.exports=router;