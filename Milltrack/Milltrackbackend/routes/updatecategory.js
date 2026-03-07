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
let category_id = req.body.category_id;
let categoryname = req.body.categoryname;
let image = req.body.image;
let strquery = `UPDATE tbl_category SET categoryname='${categoryname}',image='${image}' WHERE
category_id='${category_id}'`;
console.log(strquery)
con.query(strquery, (err, rows) => {
// if (err) throw err;
res.send({ message: 'Success' })
})
});
module.exports = router;