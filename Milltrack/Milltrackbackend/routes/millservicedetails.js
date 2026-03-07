var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_milltrack"
});

//test code to display category based on mill

// ✅ Fetch categories based on millid
router.get('/:millid', (req, res) => {
    const { millid } = req.params;

    const sql = `
        SELECT c.category_id, c.categoryname 
        FROM tbl_category c
        JOIN tbl_servicecategory sc ON c.category_id = sc.category_id
        WHERE sc.mill_id = ? `;

    con.query(sql, [millid], (err, result) => {
        if (err) {
            console.error("Error fetching categories:", err);
            return res.status(500).json({ error: "Database query error" });
        }
        res.json(result);
    });
});


//end of test code


// ✅ Fetch subcategories based on category ID
router.get('/subcategory/:category_id', (req, res) => {
    const category_id = req.params.category_id;
    console.log(category_id);
    con.query("SELECT * FROM tbl_subcategory WHERE category_id = ?", [category_id], (err, result) => {
        console.log("SELECT * FROM tbl_subcategory WHERE category_id = ?", [category_id])
        if (err) {
            console.error("Error fetching subcategories:", err);
            return res.status(500).json({ error: "Database query error" });
        }
        res.json(result);
    });
});

// ✅ Save mill service details
router.post('/', (req, res) => {
    const { millid, subcatid, amount } = req.body;

    if (!millid || !subcatid || !amount) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = "INSERT INTO tbl_millservicedetails (serviceid, millid, amount) VALUES (?, ?, ?)";
    con.query(sql, [subcatid, millid, amount], (err, result) => {
        if (err) {
            console.error('Error inserting service details:', err);
            return res.status(500).json({ error: 'Database insert error' });
        }
        res.json({ message: 'Service details added successfully', millserviceid: result.insertId });
    });
});

module.exports = router;
