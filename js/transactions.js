function loadTransactionsPage(search = "", category = "All") {

    const tableBody = document.getElementById("transactionsTableBody");

    if (!tableBody) return;

    let transactions = getTransactions();

    // Search
    if (search) {

        transactions = transactions.filter(item =>

            (item.note || "").toLowerCase().includes(search.toLowerCase()) ||

            item.category.toLowerCase().includes(search.toLowerCase())

        );

    }

    // Category Filter
    if (category !== "All") {

        transactions = transactions.filter(

            item => item.category === category

        );

    }

    tableBody.innerHTML = "";

    // No Transactions
    if (transactions.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;padding:25px;">
                    No transactions found.
                </td>
            </tr>
        `;

        return;

    }

    // Load Transactions
    transactions.forEach(item => {

        tableBody.innerHTML += `
            <tr>
                <td>${item.date}</td>
                <td>${item.category}</td>
                <td>${formatCurrency(item.amount)}</td>
                <td>${item.note || "-"}</td>
                <td>
                    <button onclick="editTransaction(${item.id})">✏️</button>
                    <button onclick="deleteTransaction(${item.id})">🗑️</button>
                </td>
            </tr>
        `;

    });

}


// Search
const searchInput = document.getElementById("transactionSearch");

const filterSelect = document.getElementById("transactionFilter");

if (searchInput) {

    searchInput.addEventListener("input", () => {

        loadTransactionsPage(

            searchInput.value,

            filterSelect ? filterSelect.value : "All"

        );

    });

}


// Category Filter
if (filterSelect) {

    filterSelect.addEventListener("change", () => {

        loadTransactionsPage(

            searchInput ? searchInput.value : "",

            filterSelect.value

        );

    });

}


// Export CSV
function exportTransactionsCSV() {

    const transactions = getTransactions();

    if (transactions.length === 0) {

        showToast("No transactions to export.", "warning");

        return;

    }

    let csv = "Date,Category,Amount,Note\n";

    transactions.forEach(item => {

        csv += `${item.date},${item.category},${item.amount},"${item.note || ""}"\n`;

    });

    const blob = new Blob([csv], {

        type: "text/csv"

    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "ExpenseX_Transactions.csv";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    showToast("CSV exported successfully!");

}


// Initial Load
document.addEventListener("DOMContentLoaded", () => {

    loadTransactionsPage();

});