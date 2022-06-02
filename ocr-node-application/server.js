require("dotenv").config();

const express = require("express");
const MainRoute = require("./Routes/MainRoute");
const fileupload = require('express-fileupload');
const app = express();

app.use(fileupload());

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methods", "*");
  // res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/", MainRoute);

app.listen(process.env.NODE_APPLICATION_PORT, (err) => {
  console.log('servere running on port ',process.env.NODE_APPLICATION_PORT)
  if (err) {
    console.log("Something went wrong!");
  }
});
