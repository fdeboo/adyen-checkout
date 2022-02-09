const express = require("express");
const viewsController = require("../controllers/viewsController");

const router = express.Router();

router.get("/preview", viewsController.getBasket);
router.get("/checkout", viewsController.getCheckout);

module.exports = router;
