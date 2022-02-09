const path = require("path");
require("dotenv").config({ path: "../.env" });

exports.getBasket = async (req, res, next) => {
  res.status(200).render("preview", {});
};

exports.getCheckout = async (req, res, next) => {
  res.status(200).render("checkout", {
    clientKey: process.env.ADYEN_CLIENT_KEY,
  });
};
