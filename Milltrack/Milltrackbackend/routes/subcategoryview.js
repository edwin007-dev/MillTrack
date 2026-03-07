module.exports = router;
var express = require('express'); 
var router = express.Router(); 
var mysql = require('mysql');
var con = mysql.createConnection({ 
host: "localhost",
user: "root",
password: "",
database: "db_milltrack"
});
/* GET users listing. */ 
router.post('/',function (req, res, next){
let subcatname = req.body.subcatname;
let image = req.body.image; 
let category_id = req.body.category_id; 
let description = req.body.description;
let query = `SELECT * FROM tbl_subcategory where subcatname='${subcatname}'`;
con.query(query, (err, rows) => { 
if (err) throw err;
if (rows == "") {
let strquery = `INSERT INTO tbl_subcategory (subcatname,category_id,image,description) VALUES(?,?,?,?)`;
con.query(strquery, [subcatname,category_id,image,description]) 
res.send({ message: 'Success' })
}
else {
res.send({ message: 'Failed' })
}
// console.log("1 record inserted");
});
});
module.exports = router;
