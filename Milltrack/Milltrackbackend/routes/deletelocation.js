var mysql = require('mysql');
var express = require('express');
var router = express.Router();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_milltrack"
});

router.delete('/', (req, res) => {
    let district_id = req.query.district_id;  // Ensure correct parameter name

    if (!district_id) {
        return res.status(400).json({ message: "district_id is required" });
    }

    let query = `DELETE FROM tbl_location WHERE district_id = ?`;
    con.query(query, [district_id], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (result.affectedRows > 0) {
            return res.json({ message: 'Success' });
        } else {
            return res.json({ message: 'Failed: No record found' });
        }
    });
});

module.exports = router;
