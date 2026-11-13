var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
global.__basedir = path.resolve(path.dirname(''));
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var checklogin = require('./routes/checklogin');
var districtview=require('./routes/districtview');
var locationreg=require('./routes/locationreg');
var getdistrictbyid=require('./routes/getdistrictbyid');
var categoryreg=require('./routes/categoryreg');
var categoryview=require('./routes/categoryview');
var subcategoryreg=require('./routes/subcategoryreg');
var getcategorybyid=require('./routes/getcategorybyid');
var subcategoryview=require('./routes/subcategoryview');
var getlocationbyid=require('./routes/getlocationbyid');
var millreg=require('./routes/millreg');
var locationview=require('./routes/locationview');
var upload=require('./routes/upload');
var getmillbylid=require('./routes/getmillbylid');
var millaccept=require('./routes/millaccept');
var millreject=require('./routes/millreject');
var millview=require('./routes/millview');
var product=require('./routes/product');
var getsubcategorybyid=require('./routes/getsubcategorybyid');
var productview=require('./routes/productview');
var customerreg=require('./routes/customerreg');
var viewmill=require('./routes/viewmill');
var viewcategory=require('./routes/viewcategory');
var millservice=require('./routes/millservice');
var millservicedetails=require('./routes/millservicedetails');
var viewmillservicedetails=require('./routes/viewmillservicedetails');
var viewmillservicecategory=require('./routes/viewmillservicecategory');
var viewcategoryincustomer=require('./routes/viewcategoryincustomer');
var viewcustmillservices=require('./routes/viewcustmillservices');
var getlocationdetails=require('./routes/getlocationdetails');
var updatelocation=require('./routes/updatelocation');
var getcategorydetails=require('./routes/getcategorydetails');
var updatecategory=require('./routes/updatecategory');
var deletelocation=require('./routes/deletelocation');
var subcatsingleview=require('./routes/subcatsingleview');
var getcategories=require('./routes/getcategories');
var millservicebyid=require('./routes//millservicebyid');
var millservicedetailsreg=require('./routes/millservicedetailsreg');
var addbookingdetail=require('./routes/addbookingdetail');
var bookingview=require('./routes/bookingview');
var bookingaccept=require('./routes/bookingaccept');
var bookingreject=require('./routes/bookingreject');
var viewbooking=require('./routes/viewbooking');
var payment=require('./routes/payment');
var getproductbyid=require('./routes/getproductbyid');
var viewproductsincustomer=require('./routes/viewproductsincustomer');
var productsingleview=require('./routes/productsingleview');
var addorderdetail=require('./routes/addorderdetail');
var cart=require('./routes/cart');
var carttotal=require('./routes/carttotal');
var order=require('./routes/order');
var report1=require('./routes/report1');
var deletecategory=require('./routes/deletecategory');
var updatesubcategory=require('./routes/updatesubcategory');
var getsubcategorydetails=require('./routes/getsubcategorydetails');
var cartpayment=require('./routes/cartpayment');
var deletesubcategory=require('./routes/deletesubcategory');
var payment1=require('./routes/payment1');
var report2=require('./routes/report2');
var myservicebooking=require('./routes/myservicebooking');
var paymentview=require('./routes/paymentview');




var cors = require("cors");
var app = express();



app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Image fuzzy matching middleware - handles files with or without extensions
app.use('/images', (req, res, next) => {
  const fs = require('fs');
  const requestedPath = req.path.substring(1); // Remove leading slash
  const imagesDir = path.join(__dirname, 'public', 'images');
  const fullPath = path.join(imagesDir, requestedPath);

  // Check if file exists exactly as requested
  if (fs.existsSync(fullPath)) {
    return next();
  }

  // Try to find file with common image extensions
  const extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
  for (let ext of extensions) {
    if (fs.existsSync(fullPath + ext)) {
      return res.sendFile(fullPath + ext);
    }
  }

  // Try to find file by stripping extension and adding correct one
  const fileWithoutExt = fullPath.split('.').slice(0, -1).join('.');
  for (let ext of extensions) {
    if (fs.existsSync(fileWithoutExt + ext)) {
      return res.sendFile(fileWithoutExt + ext);
    }
  }

  // If still not found, continue to static middleware
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/checklogin',checklogin);
app.use('/districtview',districtview);
app.use('/locationreg',locationreg);
app.use('/getdistrictbyid',getdistrictbyid);
app.use('/categoryreg',categoryreg);
app.use('/categoryview',categoryview);
app.use('/subcategoryreg',subcategoryreg);
app.use('/getcategorybyid',getcategorybyid);
app.use('/subcategoryview',subcategoryview);
app.use('/getlocationbyid',getlocationbyid);
app.use('/locationview',locationview);
app.use('/millreg',millreg);
app.use('/getmillbylid',getmillbylid);
app.use('/millaccept',millaccept);
app.use('/millreject',millreject);
app.use('/millview',millview);
app.use('/upload',upload);
app.use('/product',product);
app.use('/getsubcategorybyid',getsubcategorybyid);
app.use('/productview',productview);
app.use('/customerreg',customerreg);
app.use('/viewmill',viewmill);
app.use('/viewcategory',viewcategory);
app.use('/millservice',millservice);
app.use('/millservicedetails',millservicedetails);
app.use('/viewmillservicedetails',viewmillservicedetails);
app.use('/viewmillservicecategory',viewmillservicecategory);
app.use('/viewcategoryincustomer',viewcategoryincustomer);
app.use('/viewcustmillservices',viewcustmillservices);
app.use('/getlocationdetails',getlocationdetails);
app.use('/updatelocation',updatelocation);
app.use('/getcategorydetails',getcategorydetails);
app.use('/updatecategory',updatecategory);
app.use('/deletelocation',deletelocation);
app.use('/subcatsingleview',subcatsingleview);
app.use('/getcategories',getcategories);
app.use('/millservicebyid',millservicebyid);
app.use('/millservicedetailsreg',millservicedetailsreg);
app.use('/addbookingdetail',addbookingdetail);
app.use('/bookingview',bookingview);
app.use('/bookingaccept',bookingaccept);
app.use('/bookingreject',bookingreject);
app.use('/viewbooking',viewbooking);
app.use('/getproductbyid',getproductbyid);
app.use('/viewproductsincustomer',viewproductsincustomer);
app.use('/productsingleview',productsingleview);
app.use('/payment',payment);
app.use('/addorderdetail',addorderdetail);
app.use('/cart',cart);
app.use('/carttotal',carttotal);
app.use('/order',order);
app.use('/report1',report1);
app.use('/deletecategory',deletecategory);
app.use('/updatesubcategory',updatesubcategory);
app.use('/getsubcategorydetails',getsubcategorydetails);
app.use('/deletesubcategory',deletesubcategory);
app.use('/cartpayment',cartpayment);
app.use('/payment1',payment1);
app.use('/report2',report2);
app.use('/myservicebooking',myservicebooking);
app.use('/paymentview',paymentview);

module.exports = app;
