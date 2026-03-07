module.exports = router;
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_milltrack"
});
/* GET users listing. */

router.post('/', function (req, res, next) {
    let login_id = req.body.login_id;

    // let size=req.body.size;
    // var bookingdate = new Date(); 
    let totalamount = req.body.totalamount;
    let product_id = req.body.product_id;
    let quantity = req.body.quantity;
    let unit = req.body.unit;


    let strquery = `INSERT INTO
    tbl_orderdetails(totalamount,login_id,product_id,quantity,unit) VALUES(?,?,?,?,?)`;
    console.log(strquery);
    console.log(strquery,
        [totalamount, login_id, product_id, quantity, unit])
    con.query(strquery,
        [totalamount, login_id, product_id, quantity, unit], (err, result) => {
            console.log(strquery)
            if (err) throw err
            res.send({ message: 'Success' })
        });
});
module.exports = router;