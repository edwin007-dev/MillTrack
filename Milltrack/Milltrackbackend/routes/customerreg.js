const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

// Create MySQL connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_milltrack"
});

// Connect to the database
con.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to database.");
});

// Customer Registration Route
router.post('/', (req, res, next) => {
    let { name, phone, email, location_id, district_id, pincode, username, password } = req.body;
    let regdate = new Date();
    let role = "Customer";
    let status = "Accepted";

    // Insert into login table
    let strquery = "INSERT INTO tbl_login(username, password, role, status) VALUES (?, ?, ?, ?)";
    
    con.query(strquery, [username, password, role, status], (err, result) => {
        if (err) {
            console.error("Error inserting into tbl_login:", err);
            return res.status(500).json({ error: "Database error in login table." });
        }

        let login_id = result.insertId;

        // Insert into customer table
        let strquery1 = `INSERT INTO tbl_customer(name, email, phone, regdate, login_id, district_id, location_id, pincode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        
        con.query(strquery1, [name, email, phone, regdate, login_id, district_id, location_id, pincode], (err, result) => {
            if (err) {
                console.error("Error inserting into tbl_customer:", err);
                return res.status(500).json({ error: "Database error in customer table." });
            }

            // Send confirmation email
            const mailOptions = { 
                from: `"Mill Track" <milltrack47@gmail.com>`, 
                to: email, 
                subject: "Welcome to Mill Track", 
                html: `<p>Dear ${name},</p><p>Welcome to Milltrack! 🎉 We're thrilled to have you as part of our community. 
                As a newly registered customer, you're now set to enjoy seamless access to top-quality services and products tailored to your needs. 
                Our goal is to provide you with the best experience, from smooth transactions to excellent customer support. 
                Let’s make your journey with Milltrack a great one—your satisfaction is our priority.</p>` 
            };

            const transporter = nodemailer.createTransport({ 
                service: "gmail",
                auth: { 
                    user: "milltrack47@gmail.com", 
                    pass: "piuvntodrfssxauy"
                } 
            });

            transporter.sendMail(mailOptions, (err, info) => { 
                if (err) {
                    console.error("Email sending failed:", err);
                } else {
                    console.log("Email sent:", info.response);
                }
            });

            res.status(200).json({ message: 'Success' });
        });
    });
});

module.exports = router;
