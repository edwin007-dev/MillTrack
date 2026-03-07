var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_milltrack"
});

router.post('/', function (req, res, next) {
    let paymentdate = new Date();
    let login_id = req.body.login_id;
    let order_id = req.body.order_id;
    let amount = req.body.amount;
    let status = "Paid";
    let type = "order";

    // Step 1: Insert into tbl_payment
    let paymentQuery = `
        INSERT INTO tbl_payment (paymentdate, status, order_id, login_id, amount, type)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    con.query(paymentQuery, [paymentdate, status, order_id, login_id, amount, type], (err, result) => {
        if (err) {
            console.error("❌ Error inserting payment data:", err);
            return res.status(500).json({ error: "Internal server error (payment insert failed)" });
        }

        console.log("✅ Payment inserted");

        // Step 2: Fetch products and quantity from order details
        let orderItemsQuery = `SELECT product_id, quantity FROM tbl_orderdetails WHERE order_id = ?`;

        con.query(orderItemsQuery, [order_id], (err2, orderItems) => {
            if (err2) {
                console.error("❌ Error fetching order items:", err2);
                return res.status(500).json({ error: "Failed to fetch order items" });
            }

            if (orderItems.length === 0) {
                return res.status(404).json({ message: "⚠️ No items found for this order" });
            }

            let updatesDone = 0;
            let hasError = false;

            orderItems.forEach(item => {
                // Step 3: Get current stock
                const getStockQuery = `SELECT stock FROM tbl_product WHERE product_id = ?`;

                con.query(getStockQuery, [item.product_id], (errStock, stockResult) => {
                    if (errStock || stockResult.length === 0) {
                        hasError = true;
                        console.error(`❌ Error fetching stock for product_id ${item.product_id}:`, errStock);
                        return;
                    }

                    let currentStock = stockResult[0].stock;
                    let newStock = currentStock - item.quantity;

                    // Ensure no negative stock
                    if (newStock < 0) {
                        newStock = 0;
                    }

                    const updateStockQuery = `UPDATE tbl_product SET stock = ? WHERE product_id = ?`;

                    con.query(updateStockQuery, [newStock, item.product_id], (errUpdate, resultUpdate) => {
                        if (errUpdate) {
                            hasError = true;
                            console.error(`❌ Error updating stock for product_id ${item.product_id}:`, errUpdate);
                            return;
                        }

                        updatesDone++;

                        if (updatesDone === orderItems.length) {
                            if (!hasError) {
                                res.send({ message: "✅ Payment saved and stock updated successfully" });
                            } else {
                                res.status(500).json({ message: "⚠️ Payment saved but one or more stock updates failed" });
                            }
                        }
                    });
                });
            });
        });
    });
});

module.exports = router;
