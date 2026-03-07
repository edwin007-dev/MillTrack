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
    let location_id = req.body.location_id; 
    console.log(location_id); 
    let query = `SELECT * FROM tbl_mill m inner join tbl_login l on m.login_id=l.login_id where m.location_id='${location_id}' and l.status='requested'`; 
    console.log(query); 
    con.query(query,(err,rows) => { 
    if (err) throw err; 
    res.send(rows); 
    }); 
    }); 
    module.exports = router;