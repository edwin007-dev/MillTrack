var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_milltrack"
});

// Fetch Cart Items
router.post('/', (req, res) => {
    let loginid = req.body.login_id;

      let query = `
    SELECT sum(bd.totalamount) as totalamount  FROM   tbl_product p inner JOIN tbl_orderdetails bd ON bd.product_id = p.product_id 
    WHERE bd.login_id = '${loginid}' AND bd.order_id IS NULL`;

    con.query(query,(err, rows) => {
        console.log(query)
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.send(rows)

    });
});

module.exports = router;