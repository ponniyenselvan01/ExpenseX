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
// Income & Budget Modal
// =====================

const budgetBtn = document.getElementById("budgetSettingsBtn");
const budgetModal = document.getElementById("budgetModal");
const closeBudgetModal = document.getElementById("closeBudgetModal");

if (budgetBtn && budgetModal && closeBudgetModal) {

    budgetBtn.addEventListener("click", () => {

        document.getElementById("monthlyIncome").value =
            getIncome();

        document.getElementById("monthlyBudget").value =
            getBudget();

        budgetModal.classList.add("active");

    });

    closeBudgetModal.addEventListener("click", () => {
        budgetModal.classList.remove("active");
    });

    budgetModal.addEventListener("click", (e) => {
        if (e.target === budgetModal) {
            budgetModal.classList.remove("active");
        }
    });

}

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
let editingId = null;
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

    if (editingId) {

        updateTransaction({

            id: editingId,

            amount,

            category: document.getElementById("category").value,

            note: document.getElementById("note").value,

            date: new Date().toISOString().split("T")[0]
        });

        editingId = null;

    } else {

        addTransaction({

            id: Date.now(),

            amount,

            category: document.getElementById("category").value,

            note: document.getElementById("note").value,

            date: new Date().toLocaleDateString()

        });

    }
    loadDashboard();

    showToast("Expense Added Successfully!");
    form.reset();

    modal.classList.remove("active");
});

loadDashboard();

const budgetForm = document.getElementById("budgetForm");