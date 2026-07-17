const themeBtn = document.querySelector(".theme-btn");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");

    if (themeBtn) {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
}

// Toggle theme
if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");

        themeBtn.innerHTML = isDark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

    });

}

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

if (fab && modal && closeBtn) {

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

}



document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && modal) {

        modal.classList.remove("active");

    }

});

// =====================
// Form Validation
// =====================


const amountInput = document.getElementById("amount");
const form = document.getElementById("expenseForm");
let editingId = null;

if (form) {

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

                date: new Date().toISOString().split("T")[0]

            });

        }

        loadDashboard();
        loadAnalytics();
        loadTransactionsPage();
        showToast("Expense Added Successfully!");

        form.reset();

        modal.classList.remove("active");

    });

}

if (typeof loadDashboard === "function") {
    loadDashboard();
}

const budgetForm = document.getElementById("budgetForm");
if (budgetForm) {

    budgetForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const income = Number(document.getElementById("monthlyIncome").value);
        const budget = Number(document.getElementById("monthlyBudget").value);

        saveIncome(income);
        saveBudget(budget);

        budgetModal.classList.remove("active");

        showToast("Financial settings saved!");

        if (typeof loadDashboard === "function") {
            loadDashboard();
            loadAnalytics();
        }
    });
}
const dashboardPage = document.querySelector(".dashboard");
const analyticsPage = document.getElementById("analyticsPage");

const analyticsMenu = document.getElementById("analyticsMenu");
const dashboardMenu = document.getElementById("dashboardMenu");
const transactionsPage = document.getElementById("transactionsPage");
const transactionsMenu = document.getElementById("transactionsMenu");

const goalsPage = document.getElementById("goalsPage");
const goalsMenu = document.getElementById("goalsMenu");

const calendarPage = document.getElementById("calendarPage");
const calendarMenu = document.getElementById("calendarMenu");

const settingsPage = document.getElementById("settingsPage");
const settingsMenu = document.getElementById("settingsMenu");
function hideAllPages() {

    dashboardPage.style.display = "none";
    analyticsPage.style.display = "none";
    transactionsPage.style.display = "none";
    goalsPage.style.display = "none";
    calendarPage.style.display = "none";
    settingsPage.style.display = "none";

}

if (analyticsMenu) {

    analyticsMenu.addEventListener("click", function (e) {

        e.preventDefault();

        dashboardPage.style.display = "none";
        analyticsPage.style.display = "block";
        transactionsPage.style.display = "none";
        goalsPage.style.display = "none";
        calendarPage.style.display = "none";
        settingsPage.style.display = "none";

        loadAnalytics();

        document.getElementById("pageTitle").textContent = "Analytics";

        dashboardMenu.classList.remove("active");
        analyticsMenu.classList.add("active");
        transactionsMenu.classList.remove("active");
        goalsMenu.classList.remove("active");
        calendarMenu.classList.remove("active");

    });

}

if (transactionsMenu) {

    transactionsMenu.addEventListener("click", function (e) {

        e.preventDefault();

        dashboardPage.style.display = "none";
        analyticsPage.style.display = "none";
        goalsPage.style.display = "none";
        calendarPage.style.display = "none";
        transactionsPage.style.display = "block";
        document.querySelector(".main-content").scrollTop = 0;

        document.getElementById("pageTitle").textContent = "Transactions";
        loadTransactionsPage();

        dashboardMenu.classList.remove("active");
        analyticsMenu.classList.remove("active");
        transactionsMenu.classList.add("active");

    });

}
if (dashboardMenu) {

    dashboardMenu.addEventListener("click", function (e) {

        e.preventDefault();

        dashboardPage.style.display = "flex";
        analyticsPage.style.display = "none";
        transactionsPage.style.display = "none";
        goalsPage.style.display = "none";
        calendarPage.style.display = "none";

        document.getElementById("pageTitle").textContent = "Dashboard";

        dashboardMenu.classList.add("active");
        analyticsMenu.classList.remove("active");
        transactionsMenu.classList.remove("active");
        goalsMenu.classList.remove("active");
        calendarMenu.classList.remove("active");
        settingsMenu.classList.remove("active");

    });

}

const deleteModal = document.getElementById("deleteModal");
const cancelDelete = document.getElementById("cancelDelete");
const confirmDelete = document.getElementById("confirmDelete");

if (cancelDelete) {

    cancelDelete.addEventListener("click", () => {

        deleteModal.classList.remove("active");

    });

}

if (confirmDelete) {

    confirmDelete.addEventListener("click", () => {

        const transactions = getTransactions().filter(
            item => item.id !== deleteId
        );

        saveTransactions(transactions);

        loadDashboard();
        loadAnalytics();
        loadTransactionsPage();

        showToast("Transaction deleted successfully.");

        deleteModal.classList.remove("active");

    });

}

if (goalsMenu) {

    goalsMenu.addEventListener("click", function (e) {

        e.preventDefault();

        dashboardPage.style.display = "none";
        analyticsPage.style.display = "none";
        transactionsPage.style.display = "none";
        calendarPage.style.display = "none";
        goalsPage.style.display = "block";
        document.querySelector(".main-content").scrollTop = 0;

        document.getElementById("pageTitle").textContent = "Goals";

        if (dashboardMenu) dashboardMenu.classList.remove("active");
        if (analyticsMenu) analyticsMenu.classList.remove("active");
        if (transactionsMenu) transactionsMenu.classList.remove("active");

        goalsMenu.classList.add("active");

    });

}

if (calendarMenu) {

    calendarMenu.addEventListener("click", function (e) {

        e.preventDefault();

        dashboardPage.style.display = "none";
        analyticsPage.style.display = "none";
        transactionsPage.style.display = "none";
        goalsPage.style.display = "none";
        calendarPage.style.display = "block";
        document.querySelector(".main-content").scrollTop = 0;
        loadCalendar();

        document.getElementById("pageTitle").textContent = "Calendar";

        if (dashboardMenu) dashboardMenu.classList.remove("active");
        if (analyticsMenu) analyticsMenu.classList.remove("active");
        if (transactionsMenu) transactionsMenu.classList.remove("active");
        if (goalsMenu) goalsMenu.classList.remove("active");

        calendarMenu.classList.add("active");

    });

}

if (settingsMenu) {

    settingsMenu.addEventListener("click", function (e) {

        e.preventDefault();

        hideAllPages();

        settingsPage.style.display = "block";

        document.getElementById("pageTitle").textContent = "Settings";

        if (dashboardMenu) dashboardMenu.classList.remove("active");
        if (analyticsMenu) analyticsMenu.classList.remove("active");
        if (transactionsMenu) transactionsMenu.classList.remove("active");
        if (goalsMenu) goalsMenu.classList.remove("active");
        if (calendarMenu) calendarMenu.classList.remove("active");

        settingsMenu.classList.add("active");

    });

}