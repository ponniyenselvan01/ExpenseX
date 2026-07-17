const currencySelect = document.getElementById("currencySelect");

if (currencySelect) {

    // Load saved currency
    const savedCurrency = localStorage.getItem("currency") || "₹";
    currencySelect.value = savedCurrency;

    currencySelect.addEventListener("change", function () {

        localStorage.setItem("currency", this.value);

        location.reload();

    });

}