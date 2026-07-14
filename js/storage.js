// ===============================
// Local Storage Helper Functions
// ===============================

const STORAGE_KEY = "expensex_transactions";

// Add one transaction
function addTransaction(transaction) {

    const transactions = getTransactions();

    transactions.push(transaction);

    saveTransactions(transactions);

}


function updateTransaction(updatedTransaction) {

    const transactions = getTransactions();

    const index = transactions.findIndex(
        item => item.id === updatedTransaction.id
    );

    if (index !== -1) {

        transactions[index] = updatedTransaction;

        saveTransactions(transactions);

    }

    if (typeof loadDashboard === "function") {
        loadDashboard();
        if (typeof loadTransactionsPage === "function") {
            loadTransactionsPage();
        }
    }
}

function editTransaction(id) {

    const transactions = getTransactions();

    const transaction = transactions.find(item => item.id === id);

    if (!transaction) return;

    const amount = document.getElementById("amount");
    const category = document.getElementById("category");
    const note = document.getElementById("note");

    if (!amount || !category || !note || !modal) return;

    amount.value = transaction.amount;
    category.value = transaction.category;
    note.value = transaction.note;

    editingId = id;

    modal.classList.add("active");

}

// ==========================
// Income & Budget
// ==========================

function getIncome() {

    return Number(localStorage.getItem("income")) || 50000;

}

function saveIncome(income) {

    localStorage.setItem("income", income);

}

function getBudget() {

    return Number(localStorage.getItem("budget")) || 20000;

}

function saveBudget(budget) {

    localStorage.setItem("budget", budget);

}

function getTransactions() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveTransactions(transactions) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactions)
    );
}

let deleteId = null;

function deleteTransaction(id) {

    deleteId = id;

    document.getElementById("deleteModal").classList.add("active");

}

// ==========================
// Savings Goal
// ==========================

function getGoal() {
    return Number(localStorage.getItem("goal")) || 0;
}

function saveGoal(goal) {
    localStorage.setItem("goal", goal);
}

function getCurrentSavings() {
    return getIncome() - getTransactions().reduce(
        (sum, item) => sum + Number(item.amount),
        0
    );
}

function getGoalPercentage() {
    const goal = getGoal();

    if (goal <= 0) return 0;

    return Math.min(
        Math.round((getCurrentSavings() / goal) * 100),
        100
    );
}