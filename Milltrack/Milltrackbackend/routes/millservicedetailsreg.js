var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_milltrack"
});

router.post('/', (req, res) => {
    let millid = req.body.millid;
    let subcatid = req.body.subcat_id;
    let amount = req.body.amount;
    console.log(millid,subcatid,amount)

    let query = `SELECT * FROM tbl_millservicedetails WHERE serviceid='${subcatid}' AND millid='${millid}'`;

    con.query(query, (err, rows) => {
        if (err) {
            console.error('Error checking existing service details:', err);
            return res.status(500).json({ error: 'Database query error' });
        }

        if (rows.length > 0) { 
            console.log('Fail: Record already exists');
            return res.send({ message: 'Failed' });
        }

        console.log('Inserting new record...');
        const sql = "INSERT INTO tbl_millservicedetails (serviceid, millid, amount) VALUES (?, ?, ?)";
        
        con.query(sql, [subcatid, millid, amount], (err, result) => { 
            if (err) {
                console.error('Error inserting service details:', err);
                return res.status(500).json({ error: 'Database insert error' });
            }

            res.send({ message: 'Success', millserviceid: result.insertId });
        });
    });
});

module.exports = router;