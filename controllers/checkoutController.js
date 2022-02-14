const path = require("path");
const { Client, CheckoutAPI } = require("@adyen/api-library");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config({ path: "../.env" });
const port = process.env.PORT || 3000;

// Adyen Nodejs API library config
const client = new Client({
  apiKey: process.env.ADYEN_API_KEY,
  environment: "TEST",
});
const checkout = new CheckoutAPI(client);

exports.getSession = async (req, res) => {
  try {
    const orderRef = uuidv4();

    const response = await checkout.sessions({
      amount: {
        currency: "GBP",
        value: 1000,
      },
      reference: orderRef,
      returnUrl: `http://localhost:${port}/api/handleShopperRedirect?orderRef=${orderRef}`,
      merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
      countryCode: "GB",
    });

    res.json(response);
  } catch (err) {
    console.error(`💥 Error: ${err.errorCode}, ${err.message}`);
    res.status(err.statusCode).json(err.message);
  }
};

exports.getRedirect = async (req, res) => {
  // Create the payload for submitting payment details
  const redirect = req.method === "GET" ? req.query : req.body;
  console.log(redirect);
  const details = {};
  if (redirect.redirectResult) {
    details.redirectResult = redirect.redirectResult;
  } else if (redirect.payload) {
    details.payload = redirect.payload;
  }

  try {
    const response = await checkout.paymentsDetails({ details });
    // Conditionally handle different result codes for the shopper
    switch (response.resultCode) {
      case "Authorised":
        res.redirect("/result/success");
        break;
      case "Pending":
      case "Received":
        res.redirect("/result/pending");
        break;
      case "Refused":
        res.redirect("/result/failed");
        break;
      default:
        res.redirect("/result/error");
        break;
    }
  } catch (err) {
    console.error(`Error: ${err.message}, error code: ${err.errorCode}`);
    res.redirect("/result/error");
  }
};
