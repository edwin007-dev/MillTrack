var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var con=mysql.createConnection({
host:"localhost",
user:"root",
password:"",
database:"db_milltrack"
});
/* GET users listing. */
router.post('/', function(req, res, next) {
let startdate=req.body.startdate;
let enddate=req.body.enddate;
let qry=`SELECT * FROM tbl_order b inner join tbl_orderdetails d 
on d.order_id=b.order_id inner join tbl_product p on p.product_id=d.product_id WHERE 
orderdate>'${startdate}' and orderdate<'${enddate}'`;
console.log(qry)
con.query(qry,(err,row)=>{
if (err) throw err;
res.send(row);
});
});
module.exports = router;