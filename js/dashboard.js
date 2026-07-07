// ==========================
// Dashboard
// ==========================

function loadDashboard() {

    const transactions = getTransactions();

    loadTransactionTable(transactions);

    updateDashboardStats(transactions);

}
// ==========================
// Transaction Table
// ==========================
function loadTransactionTable(transactions) {

    const table = document.getElementById("transactionTable");

    table.innerHTML = "";

    transactions.forEach(item => {

        table.innerHTML += `
<tr>
    <td>🔥 ${item.category}</td>
    <td><strong>₹${item.amount}</strong></td>
    <td>${item.date}</td>
    <td>
        <span class="status completed">Completed</span>
    </td>
   <td>
    <button
        class="action-btn edit"
        onclick="editTransaction(${item.id})">
        <i class="fa-solid fa-pen"></i>
    </button>

    <button
        class="action-btn delete"
        onclick="deleteTransaction(${item.id})">
        <i class="fa-solid fa-trash"></i>
    </button>
</td>
</tr>
`;

    });

}


// ==========================
// Dashboard Statistics
// ==========================

function updateDashboardStats(transactions) {

    let totalExpense = 0;

    transactions.forEach(item => {
        totalExpense += Number(item.amount);
    });

    // Demo income
    const totalIncome = 50000;

    // Calculations
    const totalBalance = totalIncome - totalExpense;
    const totalSavings = totalBalance * 0.25;
    const cashFlow = totalBalance;
    const budgetLeft = 20000 - totalExpense;

    // Update Cards
    animateValue("totalIncome", 0, totalIncome);

    animateValue("totalExpense", 0, totalExpense);

    animateValue("totalBalance", 0, totalBalance);

    animateValue("totalSavings", 0, Math.max(0, totalSavings));

    document.getElementById("cashFlow").textContent =
        totalBalance >= 0 ? "Positive" : "Negative";

    document.getElementById("budgetLeft").textContent =
        `₹${Math.max(0, budgetLeft).toLocaleString()}`;

}