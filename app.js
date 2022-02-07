const express = require("express");
const path = require("path");
const app = express();

app.get("/", () => {
  console.log("hello world");
});

module.exports = app;
