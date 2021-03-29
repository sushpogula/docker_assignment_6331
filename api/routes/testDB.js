const express = require("express");
const router = express.Router();

var mysql = require('mysql');
let databaseConnection = "Waiting for Database response...";

router.get("/", function(req, res, next) {
    res.send(databaseConnection);
});

var con = mysql.createConnection({
  host: "localhost",
  user: "username",
  password: "admin"
});

con.connect(function(err) {
  if (err){
    databaseConnection = "Error connecting to Database";
    console.log("Database connection error:", err);
  }
    console.log("Connected to Database!");
    databaseConnection = "Database Connected";
});


module.exports = router;