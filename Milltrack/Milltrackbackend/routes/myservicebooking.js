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
    let loginid = req.body.id;

    let queryAccepted = `SELECT b.*, bd.*, s.subcatname, m.name, l.locationname, d.districtname from tbl_booking b 
inner join tbl_bookingdetails bd on bd.booking_id=b.booking_id
inner join tbl_subcategory s on s.subcat_id=b.subcat_id
inner join tbl_mill m on m.login_id=b.mill_id
INNER join tbl_location l on l.location_id=m.location_id
inner join tbl_district d on d.district_id=l.district_id
where b.customer_id='${loginid}' and b.status='Accepted'`;

    let queryRequested = `SELECT b.*, bd.*, s.subcatname, m.name, l.locationname, d.districtname from tbl_booking b 
inner join tbl_bookingdetails bd on bd.booking_id=b.booking_id
inner join tbl_subcategory s on s.subcat_id=b.subcat_id
inner join tbl_mill m on m.login_id=b.mill_id
INNER join tbl_location l on l.location_id=m.location_id
inner join tbl_district d on d.district_id=l.district_id
where b.customer_id='${loginid}' and b.status='requested'`;

    let queryRejected = `SELECT b.*, bd.*, s.subcatname, m.name, l.locationname, d.districtname from tbl_booking b 
inner join tbl_bookingdetails bd on bd.booking_id=b.booking_id
inner join tbl_subcategory s on s.subcat_id=b.subcat_id
inner join tbl_mill m on m.login_id=b.mill_id
INNER join tbl_location l on l.location_id=m.location_id
inner join tbl_district d on d.district_id=l.district_id
where b.customer_id='${loginid}' and b.status='Rejected'`;

// console.log(queryAccepted)
// console.log(queryRejected)
// console.log(queryRequested)


    // Execute all queries in parallel
    con.query(queryAccepted, (err1, accepted) => {
        if (err1) return res.status(500).send({ error: err1.message });

        con.query(queryRequested, (err2, requested) => {
            if (err2) return res.status(500).send({ error: err2.message });

            con.query(queryRejected, (err3, rejected) => {
                if (err3) return res.status(500).send({ error: err3.message });

                
                res.send({
                    acceptedOrders: accepted,
                    requestedOrders: requested,
                    rejectedOrders: rejected
                });
            });
        });
    });
});

module.exports = router;
