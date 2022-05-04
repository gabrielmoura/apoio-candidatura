const express = require("express");
const router = express.Router();
const Category = require("./Dashboard");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");


router.get("/admin/dashboard", adminAuth,  (req, res) => {
    
        res.render("admin/dashboard/index")
    });




module.exports = router;