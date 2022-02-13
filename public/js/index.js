import AdyenCheckout from "@adyen/adyen-web";

const navTogglerBtn = document.querySelector(".collapsible");
let clientKey = document.getElementById("clientKey");

if (navTogglerBtn) {
  navTogglerBtn.addEventListener("click", classToggle);
}

if (clientKey) {
  clientKey = clientKey.innerHTML.trim();
  getCheckout();
}

function classToggle() {
  const nav = document.querySelector(".collapsible-content");
  nav.classList.toggle("open");
  this.classList.toggle("active");
}

async function getCheckout() {
  try {
    const checkoutSessionResponse = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!checkoutSessionResponse.ok) {
      throw new Error("Something went wrong with fetching the session");
    }

    const checkoutSession = await checkoutSessionResponse.json();

    const configuration = {
      session: checkoutSession,
      clientKey,
      environment: "test",
      onPaymentCompleted: (result, component) => {
        console.info(result, component);
      },
      onError: (err, component) => {
        console.error(err.name, err.message, err.stack, component);
      },
      paymentMethodsConfiguration: {
        card: {
          ideal: {
            showImage: true,
          },
          card: {
            hasHolderName: true,
            holderNameRequired: true,
            name: "Credit or debit card",
            amount: {
              value: 1000,
              currency: "GBP",
            },
          },
          paypal: {
            amount: {
              currency: "GBP",
              value: 1000,
            },
            environment: "test",
            countryCode: "GB", // Only needed for test. This will be automatically retrieved when you are in production.
          },
        },
      },
    };

    const checkout = await AdyenCheckout(configuration);
    const dropinContainer = document.getElementById("dropin-container");

    checkout.create("dropin").mount(dropinContainer);
  } catch (err) {
    console.log(err);
  }
}
