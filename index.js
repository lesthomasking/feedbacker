//startup file: the root file, always run first

//common JS modules. Node only supports these.
//Can't use something import import Express from 'express'
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

const PORT = process.env.PORT || 5000;
app.listen(5000);