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
router.get('/:millid', (req, res) => {
    let millid =req.params.millid;
    console.log(millid);

    let query = `
        SELECT sc.servicecategory_id, c.categoryname from tbl_servicecategory sc JOIN tbl_category c ON sc.category_id = c.category_id WHERE sc.mill_id = ?`;

    con.query(query, [millid], (err, result) => {
        if (err) 
            {
            console.error('Database Error:', err);
            res.status(500).json({ error: 'Database query error' });
        } 
        else 
        {
            res.json(result);
        }
    });
});

module.exports = router;