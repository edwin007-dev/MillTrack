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
    let  subcat_id  = req.body.subcat_id;
    
    if (!subcat_id) {
        return res.status(400).json({ error: "subcat_id is required" });
    }

    let query = `SELECT s.subcat_id, s.subcatname, s.image, m.amount, m.millserviceid,s.description FROM tbl_subcategory s JOIN tbl_millservicedetails m ON s.subcat_id = m.serviceid WHERE s.subcat_id='${subcat_id}'`;

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