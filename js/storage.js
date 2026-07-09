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


function updateTransaction(updatedTransaction) {

    const transactions = getTransactions();

    const index = transactions.findIndex(
        item => item.id === updatedTransaction.id
    );

    if (index !== -1) {

        transactions[index] = updatedTransaction;

        saveTransactions(transactions);

    }

    loadDashboard();

}

function editTransaction(id) {

    const transactions = getTransactions();

    const transaction = transactions.find(item => item.id === id);

    if (!transaction) return;

    document.getElementById("amount").value = transaction.amount;

    document.getElementById("category").value = transaction.category;

    document.getElementById("note").value = transaction.note;

    editingId = id;

    modal.classList.add("active");

}