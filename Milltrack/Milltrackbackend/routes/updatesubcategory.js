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
let subcat_id = req.body.subcat_id;
let subcatname = req.body.subcatname;
let image = req.body.image;
let description = req.body.description;
let strquery = `UPDATE tbl_subcategory SET subcatname='${subcatname}',image='${image}', description='${description}' WHERE
subcat_id='${subcat_id}'`;
console.log(strquery)
con.query(strquery, (err, rows) => {
// if (err) throw err;
res.send({ message: 'Success' })
})
});
module.exports = router;