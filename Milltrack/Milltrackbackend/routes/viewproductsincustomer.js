var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// ✅ Create MySQL connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_milltrack"
});

// ✅ Check MySQL connection
con.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err);
    return;
  }
  console.log("✅ Connected to MySQL");
});

// ✅ API to fetch categories based on millid
router.post('/', (req, res) => {
    console.log("📥 Received request body:", req.body); // Log full request body

    let millid = req.body.login_id; // Extract login_id

    if (!millid) {
        console.error("❌ Error: millid is missing or undefined.");
        return res.status(400).json({ error: "millid is required" });
    }

    console.log("✅ Received millid:", millid);

    const sql = `SELECT * FROM tbl_product WHERE login_id=?;`;
                

    console.log("🛠 Executing SQL Query:", mysql.format(sql, [millid]));

    con.query(sql, [millid], (err, result) => {
        if (err) {
            console.error("❌ Error fetching categories:", err);
            return res.status(500).json({ error: "Database query error" });
        }
        console.log("✅ Query Result:", result);
        res.json(result);
    });
});

module.exports = router;