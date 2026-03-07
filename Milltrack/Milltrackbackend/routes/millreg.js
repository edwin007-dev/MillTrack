const mysql = require('mysql');
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

// ✅ Corrected MySQL Connection Initialization
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_milltrack"
});

// ✅ Ensure Connection is Established
con.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to database.");
});

// ✅ Mill Registration Route
router.post('/', (req, res, next) => {
    let { name, phone, license, email, location_id, district_id, landmark, pincode, image, username, password, category } = req.body;
    let regdate = new Date();
    let role = "Mill";
    let status = "requested";

    // ✅ Inserting data into `tbl_login`
    let loginQuery = "INSERT INTO tbl_login(username,password,role,status) VALUES(?,?,?,?)";
    con.query(loginQuery, [username, password, role, status], (err, result) => {
        if (err) {
            console.error("Error inserting into tbl_login:", err);
            return res.status(500).json({ error: "Database error in login table." });
        }

        let login_id = result.insertId;
        console.log("Login ID:", login_id);

        // ✅ Inserting data into `tbl_mill`
        let millQuery = `INSERT INTO tbl_mill(name, email, phone, license, landmark, regdate, login_id, district_id, location_id, pincode, image) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        con.query(millQuery, [name, email, phone, license, landmark, regdate, login_id, district_id, location_id, pincode, image], (err) => {
            if (err) {
                console.error("Error inserting into tbl_mill:", err);
                return res.status(500).json({ error: "Database error in mill table." });
            }

            // ✅ Inserting categories into `tbl_servicecategory`
            // let categoryQuery = "INSERT INTO tbl_servicecategory(category_id, mill_id) VALUES ?";
            // let categoryData = category.map(catId => [catId, login_id]);

            // con.query(categoryQuery, [categoryData], (err) => {
            //     if (err) {
            //         console.error("Error inserting into tbl_servicecategory:", err);
            //         return res.status(500).json({ error: "Database error in service category table." });
            //     }

                // ✅ Sending Confirmation Email
                const mailOptions = {
                    from: `"Mill Track" <milltrack47@gmail.com>`,
                    to: email,
                    subject: "Welcome to Mill Track",
                    html: `<p>Dear ${name},</p><p>Your account has been successfully registered. 
                    Welcome to Milltrack!🎉 We're excited to have you as part of our community. As a newly registered mill, you’re now connected to a platform 
                    that streamlines your operations and opens up new opportunities. With our easy-to-use tools, dedicated support, and vast network, 
                    we’re here to help you grow, maximize your potential, and succeed. Let's work together to bring the best to your customers and take 
                    your business to the next level!</p>`
                };

                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "milltrack47@gmail.com",
                        pass: "piuvntodrfssxauy"  // Secure this with environment variables
                    }
                });

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        console.error("Email sending failed:", err);
                    } else {
                        console.log("Email sent:", info.response);
                    }
                });

                // ✅ Send success response
                res.status(200).json({ message: 'Success' });
            });
        });
    });


module.exports = router;
