const express = require("express");
const ejsExtend = require("express-ejs-extend");
const path = require("path");
const viewRouter = require("./routes/viewRoutes");
const checkoutRouter = require("./routes/checkoutRoutes");
const app = express();

app.engine("ejs", ejsExtend);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/", checkoutRouter);
app.use("/", viewRouter);

module.exports = app;
