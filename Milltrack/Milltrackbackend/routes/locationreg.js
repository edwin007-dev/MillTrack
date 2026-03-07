var mysql = require('mysql');
 var express = require('express');
 var router = express.Router();
 var con = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "",
 database: "db_milltrack"
 });
 router.post('/',function (req, res, next){
    let locationname = req.body.locationname; 
    let district_id = req.body.district_id;
    let query = `SELECT * FROM tbl_location where locationname='${locationname}'`;
    con.query(query, (err, rows) => { 
    if (err) throw err;
    if (rows == "") {
    let strquery = `INSERT INTO tbl_location (locationname,district_id) VALUES(?,?)`;
    con.query(strquery, [locationname,district_id]) 
    res.send({ message: 'Success' })
    }
    else {
    res.send({ message: 'Failed' })
    }
    // console.log("1 record inserted");
    });
    });
    module.exports=router;