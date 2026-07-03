// ===============================
// Local Storage Helper Functions
// ===============================

const STORAGE_KEY = "expensex_transactions";

// Get all transactions
function getTransactions() {

    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

}

// Save all transactions
function saveTransactions(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}

// Add one transaction
function addTransaction(transaction) {

    const transactions = getTransactions();

    transactions.push(transaction);

    saveTransactions(transactions);

}