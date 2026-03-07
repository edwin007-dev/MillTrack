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
    let district_id = req.body.district_id; 
    console.log(district_id); 
    let query = `SELECT * FROM tbl_location l inner join tbl_district d on d.district_id=l.district_id where l.district_id='${district_id}'`; 
    console.log(query); 
con.query(query,(err,rows) => { 
    if (err) throw err; 
    res.send(rows); 
    }); 
    }); 
    module.exports = router;