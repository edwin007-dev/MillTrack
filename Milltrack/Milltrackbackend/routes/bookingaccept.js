var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var nodemailer = require('nodemailer');

// MySQL connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_milltrack"
});

// ✅ Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'milltrack47@gmail.com',   // ✅ Your Gmail address
    pass: 'piuvntodrfssxauy'             // ✅ App Password (not your real password)
  }
});

// 📩 Accept Booking & Send Email
router.post('/', (req, res) => {
  let bookingdetails_id = req.body.bookingdetails_id;
  let time = req.body.time;

  // 1️⃣ Update the booking
  let updateQuery = `
    UPDATE tbl_booking 
    SET status = 'Accepted', time = '${time}' 
    WHERE booking_id = '${bookingdetails_id}'
  `;
  con.query(updateQuery, (err, rows) => {
    if (err) {
      console.error('DB update error:', err);
      return res.status(500).send({ message: 'Database update failed' });
    }

    // 2️⃣ Fetch email, name, service
    let emailQuery = `
      SELECT ct.email, ct.name, s.subcatname 
      FROM tbl_booking b 
      JOIN tbl_customer ct ON ct.login_id = b.customer_id 
      JOIN tbl_subcategory s ON s.subcat_id = b.subcat_id 
      WHERE b.booking_id = '${bookingdetails_id}'
    `;
    con.query(emailQuery, (err, result) => {
      if (err || result.length === 0) {
        console.error('Email query error:', err);
        return res.status(500).send({ message: 'Failed to fetch customer email' });
      }

      const { email, name, subcatname } = result[0];

      // 3️⃣ Send confirmation email
      const mailOptions = {
        from: 'piuvntodrfssxauy.com',
        to: email,
        subject: '📢 Your Service Booking Has Been Accepted!',
        html: `
          <p>Hi <b>${name}</b>,</p>
          <p>We are happy to inform you that your booking for <b>${subcatname}</b> has been 
          <span style="color: green;"><b>Accepted</b></span>.</p>
          <p><b>Scheduled Time:</b> ${time}</p>
          <p>Thanks for choosing MillTrack! 🛠</p>
        `
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error('Email send error:', err);
          return res.status(500).send({ message: 'Booking updated, but email failed' });
        }

        res.send({ message: 'Success' });
      });
    });
  });
});

module.exports = router;