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
    let bookingdetails_id = req.body.bookingdetails_id;
    let booking_id=req.body.booking_id
    let amount = req.body.amount;
    let status = "Paid";
    let type ="service"
    
    let strquery = `INSERT INTO tbl_payment(paymentdate,status,
        bookingdetails_id, login_id,amount,type) VALUES
    (?, ?, ?, ?, ?,?)`;
    con.query(strquery, [paymentdate,status,
        bookingdetails_id, login_id, amount,type], (err, result) => {
        if (err) {
        console.error("Error inserting payment data:", err);
        return res.status(500).json({ error: "Internal server error" });
        }
        con.query('SELECT username FROM tbl_login WHERE login_id = ?',
        [login_id], (err, rows) => {
        if (err) {
        console.error("Error selecting username:", err);
        return res.status(500).json({ error: "Internal server error" });
        }
        con.query('UPDATE tbl_booking SET status = ? WHERE booking_id = ?', ["paid", booking_id], (err, updateResult)=> {

        if (err) {
        console.error("Error updating booking status:", err);
        return res.status(500).json({ error: "Internal server error" });
        }
        console.log("Booking status updated to paid");
        // Send response after all queries are completed
        return res.status(200).json({ message: 'Success' });
        });
        });
        });
        });
        module.exports=router;