let deleteId = null;

function deleteTransaction(id) {

    deleteId = id;

    document
        .getElementById("deleteModal")
        .classList.add("active");

}
// ==========================
// Dashboard
// ==========================

function loadDashboard() {

    const transactions = getTransactions();

    updateDashboardStats(transactions);

    loadTransactionTable(transactions);

    setupSearch(transactions);

    setupCategoryFilter(transactions);

    setupSorting(transactions);

    setupExportCSV();

    updateFinancialHealth(transactions);

    updateInsights(transactions);
}
// ==========================
// Transaction Table
// ==========================
function loadTransactionTable(transactions) {

    const table = document.getElementById("transactionTable");

    table.innerHTML = "";
    if (transactions.length === 0) {

        table.innerHTML = `
        <tr class="fade-in">
            <td colspan="5" class="empty-state">

                <div class="empty-box">

                    <div class="empty-icon">📭</div>

                    <h3>No Transactions Yet</h3>

                    <p>
                        Start by adding your first expense.
                    </p>

                    <button
                        class="empty-btn"
                        onclick="document.querySelector('.fab').click()">

                        + Add Expense

                    </button>

                </div>

            </td>
        </tr>
    `;

        return;

    }

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

// ==========================
// Search Transactions
// ==========================

function setupSearch(transactions) {

    const searchInput = document.getElementById("searchTransaction");

    if (!searchInput) return;

    searchInput.oninput = function () {

        const keyword = this.value.toLowerCase();

        const filtered = transactions.filter(item =>

            item.category.toLowerCase().includes(keyword) ||

            item.note.toLowerCase().includes(keyword) ||

            String(item.amount).includes(keyword)

        );

        loadTransactionTable(filtered);

    };

}

// ==========================
// Category Filter
// ==========================

function setupCategoryFilter(transactions) {

    const filter = document.getElementById("categoryFilter");

    if (!filter) return;

    filter.onchange = function () {

        if (this.value === "all") {

            loadTransactionTable(transactions);

            return;

        }

        const filtered = transactions.filter(item =>
            item.category === this.value
        );

        loadTransactionTable(filtered);

    };

}

// ==========================
// Sort Transactions
// ==========================

function setupSorting(transactions) {

    const sort = document.getElementById("sortTransactions");

    if (!sort) return;

    sort.onchange = function () {

        const sorted = [...transactions];

        if (this.value === "newest") {

            sorted.sort((a, b) => b.id - a.id);

        } else {

            sorted.sort((a, b) => a.id - b.id);

        }

        loadTransactionTable(sorted);

    };

}

// ==========================
// Export CSV
// ==========================

function setupExportCSV() {

    const exportBtn = document.getElementById("exportCSV");

    if (!exportBtn) return;

    exportBtn.onclick = function () {

        const transactions = getTransactions();

        if (transactions.length === 0) {

            showToast("No transactions to export!", "error");

            return;

        }

        let csv =
            "Category,Amount,Date,Note\n";

        transactions.forEach(item => {

            csv += `${item.category},${item.amount},${item.date},"${item.note}"\n`;

        });

        const blob = new Blob([csv], {
            type: "text/csv"
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "ExpenseX_Transactions.csv";

        a.click();

        URL.revokeObjectURL(url);

        showToast("CSV exported successfully!");

    };

}
// ==========================
// Financial Health
// ==========================

function updateFinancialHealth(transactions) {

    let totalExpense = 0;

    transactions.forEach(item => {

        totalExpense += Number(item.amount);

    });

    const totalIncome = 50000;

    let score = Math.max(
        0,
        Math.min(
            100,
            Math.round((1 - totalExpense / totalIncome) * 100)
        )
    );

    animateNumber("healthScore", score);

    const circle = document.getElementById("healthProgress");
    if (score >= 80) {

        circle.style.stroke = "#22c55e";

    }

    else if (score >= 60) {

        circle.style.stroke = "#facc15";

    }

    else if (score >= 40) {

        circle.style.stroke = "#fb923c";

    }

    else {

        circle.style.stroke = "#ef4444";

    }

    const circumference = 440;

    let current = circumference;

    const target =
        circumference - (score / 100) * circumference;

    function animateCircle() {

        current -= 6;

        if (current <= target) {

            circle.style.strokeDashoffset = target;

            return;

        }

        circle.style.strokeDashoffset = current;

        requestAnimationFrame(animateCircle);

    }

    circle.style.strokeDashoffset = circumference;

    requestAnimationFrame(animateCircle);

    const status = document.getElementById("healthStatus");

    if (score >= 80) {

        status.textContent = "🟢 Excellent";

    }

    else if (score >= 60) {

        status.textContent = "🟡 Good";

    }

    else if (score >= 40) {

        status.textContent = "🟠 Average";

    }

    else {

        status.textContent = "🔴 Poor";

    }

}
// ==========================
// Smart Insights
// ==========================

function updateInsights(transactions) {

    const list = document.getElementById("insightsList");

    if (!list) return;

    list.innerHTML = "";

    if (transactions.length === 0) {

        list.innerHTML =
            "<li>💸 No transactions yet.</li>";

        return;

    }

    let totalExpense = 0;

    const categoryTotals = {};

    transactions.forEach(item => {

        totalExpense += Number(item.amount);

        categoryTotals[item.category] =
            (categoryTotals[item.category] || 0) + Number(item.amount);

    });

    let highestCategory = "";

    let highestAmount = 0;

    for (const category in categoryTotals) {

        if (categoryTotals[category] > highestAmount) {

            highestAmount = categoryTotals[category];

            highestCategory = category;

        }

    }
    if (totalExpense <= budget) {

        list.innerHTML += `
        <li>🟢 Great! You're under budget.</li>
    `;

    } else {

        list.innerHTML += `
        <li>🔴 Warning! Budget exceeded.</li>
    `;

    }

    // Recommendation

    if (highestCategory) {

        list.innerHTML += `
        <li>💡 Try reducing <strong>${highestCategory}</strong> spending to improve your financial health.</li>
    `;

    }

    if (budgetUsed > 90) {

        list.innerHTML += `
        <li>⚠️ You're using almost all of your monthly budget.</li>
    `;

    } else if (budgetUsed < 50) {

        list.innerHTML += `
        <li>🎉 Excellent! You still have plenty of budget remaining.</li>
    `;

    }

}

document
    .getElementById("cancelDelete")
    .addEventListener("click", () => {

        document
            .getElementById("deleteModal")
            .classList.remove("active");

        deleteId = null;

    });

document
    .getElementById("confirmDelete")
    .addEventListener("click", () => {

        const transactions = getTransactions();

        const updated = transactions.filter(
            item => item.id !== deleteId
        );

        saveTransactions(updated);

        document
            .getElementById("deleteModal")
            .classList.remove("active");

        deleteId = null;

        loadDashboard();

        showToast("Transaction deleted!");

    });