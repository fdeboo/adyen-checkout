const express = require("express");
const viewsController = require("../controllers/viewsController");

const router = express.Router();

router.get("/basket", viewsController.getBasket);
router.get("/checkout", viewsController.getCheckout);
router.get("/result/:type", viewsController.getResult);

module.exports = router;
