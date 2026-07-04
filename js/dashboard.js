// ==========================
// Dashboard
// ==========================

function loadDashboard() {

    const transactions = getTransactions();

    loadTransactionTable(transactions);

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
    <td>🔥 TEST ${item.category}</td>
    <td><strong>₹${item.amount}</strong></td>
    <td>${item.date}</td>
    <td>
        <span class="status completed">Completed</span>
    </td>
    <td>
        <button class="action-btn edit">
            <i class="fa-solid fa-pen"></i>
        </button>

        <button class="action-btn delete">
            <i class="fa-solid fa-trash"></i>
        </button>
    </td>
</tr>
`;

    });

}