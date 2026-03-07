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
    let loginid = req.body.loginid;

    let query = `SELECT * FROM tbl_order WHERE order_id=(SELECT MAX(order_id) from tbl_order where login_id='${loginid}')`;

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