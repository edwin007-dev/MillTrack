var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_milltrack"
});

router.post('/', (req, res, next) => {
  let login_id = req.body.login_id;

  let query = `
    SELECT c.name, p.amount, p.type, p.paymentdate
  FROM tbl_payment p
  JOIN tbl_customer c ON p.login_id = c.login_id
  WHERE p.login_id = ?
  ORDER BY p.paymentdate DESC
  `;

  console.log("Executing Query:", query, "With login_id:", login_id);

  con.query(query, [login_id], (err, rows) => {
    if (err) {
      console.error("Query Error:", err);
      return res.status(500).send(err);
    }
    res.send(rows);
  });
});

module.exports = router;
