const express = require("express");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");

const PORT = process.env.PORT || 4000;

var app = express();

//logs all incoming requests
app.use(morgan("short"));

var filePath = path.join(__dirname, "static");

//static file server middleware
app.use(express.static(filePath));

//404 error handler
app.use(function(req, res){
  res.status(404);
  res.send("File not found");
});

//starts the app at port 4000
app.listen(PORT, function(){
  console.log("App started on port "+ PORT +" ...");
});
