var express = require('express');
var router = express.Router();
var con = require('../database');

// Fetch mill services by mill ID
router.post('/mill-services', (req, res) => {
    let millid = req.body.millid;
    let query = `SELECT ms.millserviceid, sc.subcatname, ms.amount, ms.comment FROM millservice ms JOIN subcategory sc ON ms.subcatid = sc.subcatid WHERE ms.millid = ?`;
    con.query(query, [millid], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
    console.log(query);
});
module.exports = router;
