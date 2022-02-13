const express = require("express");
const viewsController = require("../controllers/checkoutController");

const router = express.Router();

router.post("/sessions", viewsController.getSession);

module.exports = router;
