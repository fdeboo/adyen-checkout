const navTogglerBtn = document.querySelector(".collapsible");
const checkoutBtn = document.querySelector(".checkout-btn");

if (navTogglerBtn) {
  navTogglerBtn.addEventListener("click", classToggle);
}

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", getCheckout);
}

function classToggle() {
  const nav = document.querySelector(".collapsible-content");
  nav.classList.toggle("open");
  this.classList.toggle("active");
}

async function getCheckout() {
  response = await fetch("/api/session", {
    method: "POST",
  });
}
