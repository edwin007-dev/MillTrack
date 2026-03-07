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
    // let status = req.body.status;
    let bookingdetails_id = req.body.bookingdetails_id;
    let strquery =`UPDATE tbl_booking SET status =
    'Rejected'  WHERE booking_id ='${bookingdetails_id}'`;
    console.log(strquery)
    con.query(strquery, (err, rows) => {
    if (err)
    throw err;
    res.send({message:'rejected'})
    });
    })
    module.exports = router;