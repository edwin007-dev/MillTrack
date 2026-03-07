var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_milltrack"
});


// ✅ Fetch categories based on millid
router.get('/categories/:millid', (req, res) => {
    const { millid } = req.params;
    
    const sql = `
        SELECT c.category_id, c.categoryname 
        FROM tbl_category c
        JOIN tbl_servicecategory sc ON c.category_id = sc.category_id
        WHERE sc.mill_id = ?`;

    con.query(sql, [millid], (err, result) => {
        if (err) {
            console.error("Error fetching categories:", err);
            return res.status(500).json({ error: "Database query error" });
        }
        res.json(result);
    });
});

// ✅ Fetch mill service details based on selected category
router.get('/:millid/:category_id', (req, res) => {
    const { millid, category_id } = req.params;

    const sql = `SELECT ms.millserviceid, ms.millid, ms.serviceid, ms.count, ms.amount, s.subcatname as subcategoryname FROM tbl_millservicedetails ms
        JOIN tbl_subcategory s ON ms.serviceid = s.subcat_id  where ms.millid= ? AND s.category_id = ?`;

    con.query(sql, [millid, category_id], (err, result) => {
        console.log(sql, [millid, category_id]);

        if (err) {
            console.error("Error fetching mill services:", err);
            return res.status(500).json({ error: "Database query error" });
        }
        res.json(result);
    });
  
});

module.exports = router;
