const path = require("path");

exports.getCheckout = async (req, res, next) => {
  res.status(200).render("checkout", {});
};
