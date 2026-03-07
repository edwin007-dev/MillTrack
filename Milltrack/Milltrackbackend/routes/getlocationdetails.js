var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"db_milltrack"
})

router.post('/', (req, res, next) => {
    let location_id = req.body.id;
    let query = `SELECT * FROM tbl_location l inner join tbl_district d on d.district_id=l.district_id where l.location_id ='${location_id}'`;
    console.log(query);
    con.query(query, (err, rows) => {
    if (err) throw err;
    res.send(rows);
    });
    });
/* GET users listing. */

module.exports = router;
