var express = require('express'); 
var router = express.Router(); 
var mysql = require('mysql'); 
var con = mysql.createConnection({ 
   host: "localhost", 
   user: "root", 
   password: "", 
   database: "db_milltrack" 
}); 
router.get('/', (req, res, next) => { 
    let query = `SELECT 
    s.category_id,
    s.subcatname,
    COUNT(b.booking_id) AS bookingcount
FROM 
    tbl_booking b
INNER JOIN 
    tbl_subcategory s ON s.subcat_id = b.subcat_id
GROUP BY 
    s.category_id, s.subcatname
ORDER BY 
    s.category_id, s.subcatname

`; 
 
    con.query(query, (err, rows) => { 
        if (err) throw err; 
        res.send(rows); 
        console.log(rows); 
    }); 
}); 
module.exports = router;