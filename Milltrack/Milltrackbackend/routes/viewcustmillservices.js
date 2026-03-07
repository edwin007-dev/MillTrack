var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_milltrack",
});

// ✅ Fetch subcategories based on `millid` & `categoryid`
router.post("/", (req, res) => {
  let { millid, categoryid } = req.body;

  if (!millid || !categoryid) {
    return res.status(400).json({ error: "millid and categoryid are required" });
  }

  const sql = `
    SELECT s.subcat_id, s.subcatname, s.image, m.amount,m.millserviceid
    FROM tbl_subcategory s 
    JOIN tbl_millservicedetails m ON s.subcat_id = m.serviceid 
    WHERE m.millid = ? AND s.category_id = ?`;

  console.log("Executing SQL Query:", mysql.format(sql, [millid, categoryid]));

  con.query(sql, [millid, categoryid], (err, result) => {
    if (err) {
      console.error("❌ Error fetching subcategories:", err);
      return res.status(500).json({ error: "Database query error" });
    }
    res.json(result);
  });
});

module.exports = router;
