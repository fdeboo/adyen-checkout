const path = require("path");
require("dotenv").config({ path: "../.env" });
const port = process.env.PORT || 3000;

exports.getBasket = async (req, res) => {
  const basketItems = [
    {
      name: "Knitted socks",
      price: 12.0,
      quantity: 2,
      img: "./images/grey_socks.jpg",
    },
    {
      name: "White blouse",
      price: 30.0,
      quantity: 1,
      img: "./images/white_blouse.jpg",
      size: "XS",
    },
    {
      name: "Grunge shoes",
      price: 40.0,
      quantity: 1,
      img: "./images/brown_shoes.jpeg",
      size: "5",
    },
  ];
  res.status(200).render("basket", {
    basketItems,
  });
};

exports.getCheckout = async (req, res) => {
  const clientKey = process.env.ADYEN_CLIENT_KEY;

  res.status(200).render("checkout", {
    clientKey,
  });
};

exports.getResult = async (req, res) => {
  res.status(200).render("result", {
    type: req.params.type,
  });
};
