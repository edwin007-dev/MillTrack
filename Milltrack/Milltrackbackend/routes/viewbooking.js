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
    let customer_id = req.body.login_id;
    let query =`SELECT 
      c.categoryname, 
      s.subcatname, 
      s.image, 
      ct.name AS name, 
      b.*, 
      bd.*
    FROM tbl_booking b
    INNER JOIN tbl_bookingdetails bd ON b.booking_id = bd.booking_id
    INNER JOIN tbl_customer ct ON ct.login_id = b.customer_id
    INNER JOIN tbl_subcategory s ON s.subcat_id = b.subcat_id
    INNER JOIN tbl_category c ON c.category_id = s.category_id
    LEFT JOIN tbl_payment p ON p.bookingdetails_id = bd.bookingdetails_id AND p.status = 'Paid'
    WHERE b.customer_id = '${customer_id}'
      AND b.status = 'Accepted'
      AND p.payment_id IS NULL`;


    console.log(query);
    con.query(query, (err, rows) =>{
    if (err) throw err;
    res.send(rows);
    });
    });
    module.exports = router;