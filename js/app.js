const themeBtn = document.querySelector(".theme-btn");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

// Toggle theme
themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeBtn.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

    localStorage.setItem("theme", isDark ? "dark" : "light");

});

// =====================
// Expense Modal
// =====================

const fab = document.querySelector(".fab");

const modal = document.getElementById("expenseModal");

const closeBtn = document.querySelector(".close-modal");

fab.addEventListener("click", () => {

    modal.classList.add("active");

});

closeBtn.addEventListener("click", () => {

    modal.classList.remove("active");

});

modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.classList.remove("active");

    }

});

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        modal.classList.remove("active");

    }

});

// =====================
// Form Validation
// =====================

const form = document.getElementById("expenseForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

});

const amountInput = document.getElementById("amount");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const amount = Number(amountInput.value);

    if (amount <= 0 || isNaN(amount)) {

        showToast("Please enter a valid amount.", "error");

        amountInput.focus();

        return;

    }

    const transaction = {

        id: Date.now(),

        amount,

        category: document.getElementById("category").value,

        note: document.getElementById("note").value,

        date: new Date().toLocaleDateString()

    };

    addTransaction(transaction);
    loadDashboard();

    showToast("Expense Added Successfully!");
    form.reset();

    modal.classList.remove("active");
});

loadDashboard();