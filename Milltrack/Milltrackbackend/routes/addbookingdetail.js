module.exports = router;
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "db_milltrack"
});
/* GET users listing. */

router.post('/', function (req, res, next) {
    let customerid = req.body.customerid;
    var bookingdate = new Date(); 
    let amount=req.body.amount;
    let subcat_id=req.body.subcat_id;
     let quantity = req.body.quantity;
     let unit=req.body.unit;
     let requireddate=req.body.requireddate;
     let status="requested";
     let millid=req.body.millid;

    
     let loginQuery = "INSERT INTO tbl_booking(customer_id,subcat_id,status,mill_id) VALUES(?,?,?,?)";
         con.query(loginQuery, [customerid, subcat_id, status,millid], (err, result) => {
             if (err) {
                 console.error("Error inserting into tbl_login:", err);
                 return res.status(500).json({ error: "Database error in login table." });
             }
     
             let booking_id = result.insertId;
             console.log("Login ID:", booking_id);
     
             // ✅ Inserting data into `tbl_mill`
             let millQuery = `INSERT INTO tbl_bookingdetails(booking_id, booking_date, quantity, amount, unit,required_date) 
                              VALUES (?, ?, ?, ?, ?, ?)`;
             con.query(millQuery, [booking_id,bookingdate,quantity,amount,unit,requireddate], (err) => {
                 if (err) {
                     console.error("Error inserting into tbl_mill:", err);
                     return res.status(500).json({ error: "Database error in mill table." });
                 }
     
              
                     // ✅ Sending Confirmation Email
                    //  const mailOptions = {
                    //      from: `"Mill Track" <milltrack47@gmail.com>`,
                    //      to: email,
                    //      subject: "Welcome to Mill Track",
                    //      html: `<p>Dear ${name},</p><p>Your account has been successfully registered.</p>`
                    //  };
     
                    //  const transporter = nodemailer.createTransport({
                    //      service: "gmail",
                    //      auth: {
                    //          user: "milltrack47@gmail.com",
                    //          pass: "piuvntodrfssxauy"  // Secure this with environment variables
                    //      }
                     });
     
                    //  transporter.sendMail(mailOptions, (err, info) => {
                    //      if (err) {
                    //          console.error("Email sending failed:", err);
                    //      } else {
                    //          console.log("Email sent:", info.response);
                    //      }
                    //  });
     
                     // ✅ Send success response
                     res.send({ message: 'Success' });
                 });
                })

    // let strquery = `INSERT INTO
    // tbl_bookingdetails(amount,login_id,subcat_id,quantity,unit,status) VALUES(?,?,?,?,?,?)`;
    // console.log(strquery);
    // console.log(strquery,
    // [amount,login_id,subcat_id,quantity,unit,status])
    // con.query(strquery,
    // [amount,login_id,subcat_id,quantity,unit,status], (err, result) => {
    // console.log(strquery)
    // if (err) throw err
    // res.send({ message: 'Success' })
    // });
    // });
    module.exports=router;