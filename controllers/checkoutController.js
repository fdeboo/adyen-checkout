const path = require("path");
const { Client, CheckoutAPI } = require("@adyen/api-library");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config({ path: "../.env" });
const port = process.env.PORT || 3000;

exports.getSession = async (req, res) => {
  try {
    // Adyen Nodejs API library config
    const client = new Client({
      apiKey: process.env.ADYEN_API_KEY,
      environment: "TEST",
    });

    const checkout = new CheckoutAPI(client);
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
