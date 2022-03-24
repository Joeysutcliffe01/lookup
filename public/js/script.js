const async = require("hbs/lib/async");

const logoutButton = document.getElementById("logout-btn");

document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("watchup JS imported successfully!");
  },
  false
);

logoutButton.addEventListener("click", async () => {
  console.log("logout");
  await fetch("auth/logout");
});
