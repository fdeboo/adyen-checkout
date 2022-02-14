const express = require("express");
const checkoutController = require("../controllers/checkoutController");

const router = express.Router();

router.post("/sessions", checkoutController.getSession);
router.all("/handleShopperRedirect", checkoutController.getRedirect);

module.exports = router;
