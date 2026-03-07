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
    let login_id=req.body.id;
    let query = `SELECT c.categoryname, s.subcatname, s.image, ct.name, b.*, bd.* from tbl_booking b 
    inner join tbl_bookingdetails bd on b.booking_id=bd.booking_id 
    inner join tbl_customer ct on ct.login_id=b.customer_id 
    inner join tbl_subcategory s on s.subcat_id=b.subcat_id 
    inner join tbl_category c on c.category_id=s.category_id where b.mill_id='${login_id}' and b.status="requested";`;
    console.log(query); 
    con.query(query, (err, rows) =>  
    { 
    if (err) throw err; 
    res.send(rows); 
    }); 
    }); 
    module.exports=router;