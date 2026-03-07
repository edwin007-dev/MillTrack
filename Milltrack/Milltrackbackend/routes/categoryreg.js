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
router.post('/', function (req, res, next) {
    let categoryname = req.body.categoryname;
    let image = req.body.image;
    let query = `SELECT * FROM tbl_category where 
categoryname='${categoryname}'`;
    con.query(query, (err, rows) => {
        if (err) throw err;
        if (rows == "") {
            let strquery = `INSERT INTO tbl_category(categoryname,image) VALUES(?,?)`;
            con.query(strquery, [categoryname, image])
            res.send({ message: 'Success' })
        }
        else {
            res.send({ message: 'Failed' })
        }
        // console.log("1 record inserted");
    });
});
module.exports = router;
