var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_milltrack"
});

// Fetch service categories based on mill ID
router.post('/', (req, res) => {
    let product_id = req.body.product_id;

    if (!product_id) {
        return res.status(400).json({ error: "product_id is required" });
    }

    let query = `SELECT 
    product_id, 
    productname, 
    image, 
    price, 
    description 
FROM 
    tbl_product 
WHERE 
    product_id = '${product_id}'`;

    con.query(query, (err, rows) => {
        console.log(query)
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(rows);
    });
});

module.exports = router;