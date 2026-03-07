var mysql = require('mysql');
 var express = require('express');
 var router = express.Router();
 var con = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "",
 database: "db_milltrack"
 });
router.post('/', (req, res, next) => {
let category_id=req.body.category_id;
let productname=req.body.productname;
let image=req.body.image;
let description=req.body.description;

let stock=req.body.stock;
let price=req.body.price;
let login_id=req.body.login_id;

let unit=req.body.unit;
let strquery = `select * from tbl_product where productname= '${productname}'`;
console .log(strquery)
con.query(strquery,(err,rows)=>{
if(rows ==""){
   
let query1= `insert into tbl_product(category_id,productname,image,description,price,stock,login_id,unit) values(?,?,?,?,?,?,?,?)`;
con.query(query1,[category_id,productname,image,description,price,stock,login_id,unit])
console.log(query1)
res.send({message:'success'})
}
else
{
res.send({message:'failed'})
}
})
});
module.exports = router;