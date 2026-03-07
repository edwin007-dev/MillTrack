const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_milltrack"
});

router.post('/', function (req, res) {
    let { login_id, totalamount } = req.body;
    let orderdate = new Date();
 

    // Insert into tbl_booking
    let insertQuery = `INSERT INTO tbl_order(totalamount,login_id,orderdate) VALUES (?, ?, ?)`;

    con.query(insertQuery, [totalamount, login_id, orderdate], (err, result) => {
        if (err) {
            console.error("Error inserting order:", err);
            return res.status(500).json({ success: false, message: "Order failed" });
        }

        let order_id = result.insertId; // Get the last inserted booking ID

        console.log("Inserted order ID:", order_id);

        // Update tbl_bookingdetails where bookingid is NULL
        let updateQuery = `UPDATE tbl_orderdetails SET order_id = ? WHERE login_id = ? AND order_id IS NULL`;

        con.query(updateQuery, [order_id, login_id], (updateErr, updateResult) => {
            if (updateErr) {
                console.error("Error updating booking details:", updateErr);
                return res.status(500).json({ success: false, message: "Failed to update order details" });
            }

            res.json({ success: true, message: "order confirmed!", order_id: order_id });
        });
    });
});

module.exports = router;