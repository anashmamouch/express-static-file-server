const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 4000;

var app = express();

//logs all incoming requests
app.use(function(req, res, next){
  console.log("IP: " + req.url);
  console.log("date: " + new Date());
  next();
});

//static file server middleware
app.use(function(req, res, next){
  var filePath = path.join(__dirname, "static", req.url);
  fs.stat(filePath, function(err, fileInfo){
    if(err){
      next();
      return;
    }

    if(fileInfo.isFile()){
      res.sendFile(filePath);
    }else{
      next();
    }
  })
});

//404 error handler
app.use(function(req, res){
  res.status(404);
  res.send("File not found");
});

//starts the app at port 4000
app.listen(PORT, function(){
  console.log("App started on port "+ PORT +" ...");
});
