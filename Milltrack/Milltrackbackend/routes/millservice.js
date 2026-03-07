var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_milltrack"
});

//  Save selected categories with millid
router.post('/', (req, res) => {
    const { millid, categories } = req.body;

    if (!millid || !categories || categories.length === 0) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    // Check if each category already exists
    const checkQuery = `SELECT category_id FROM tbl_servicecategory WHERE mill_id = ? AND category_id IN (?)`;
    
    con.query(checkQuery, [millid, categories], (err, existingRows) => {
        if (err) {
            console.error('Error checking existing categories:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Get categories that are NOT already in the database
        const existingCategoryIds = existingRows.map(row => row.category_id);
        const newCategories = categories.filter(category_id => !existingCategoryIds.includes(category_id));

        if (newCategories.length === 0) {
            return res.status(409).json({ error: 'Categories already exist for this mill.' }); // 🚀 Use 409 status
        }

        //  Insert only the new categories
        const values = newCategories.map(category_id => [millid, category_id]);
        const insertQuery = 'INSERT INTO tbl_servicecategory (mill_id, category_id) VALUES ?';

        con.query(insertQuery, [values], (err, result) => {
            if (err) {
                console.error('Error inserting categories:', err);
                return res.status(500).json({ error: 'Database insert error' });
            }
            res.status(201).json({ message: 'Categories saved successfully!', affectedRows: result.affectedRows });
        });
    });
});

module.exports = router;