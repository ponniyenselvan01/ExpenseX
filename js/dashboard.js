let currentFilter = "all";
function filterTransactions(transactions) {

    const today = new Date();

    return transactions.filter(item => {

        const date = new Date(item.date);

        switch (currentFilter) {

            case "today":

                return date.toDateString() === today.toDateString();

            case "week": {

                const start = new Date(today);

                start.setDate(today.getDate() - 7);

                return date >= start;
            }

            case "month":

                return (
                    date.getMonth() === today.getMonth() &&
                    date.getFullYear() === today.getFullYear()
                );

            case "year":

                return date.getFullYear() === today.getFullYear();

            default:

                return true;

        }

    });

}

function deleteTransaction(id) {

    deleteId = id;

    document
        .getElementById("deleteModal")
        .classList.add("active");


}
document.addEventListener("DOMContentLoaded", () => {

    const deleteModal = document.getElementById("deleteModal");

    const cancelDelete = document.getElementById("cancelDelete");

    const confirmDelete = document.getElementById("confirmDelete");

    cancelDelete.addEventListener("click", () => {

        deleteModal.classList.remove("active");

        deleteId = null;

    });

    confirmDelete.addEventListener("click", () => {

        let transactions = getTransactions();

        transactions = transactions.filter(
            transaction => transaction.id !== deleteId
        );

        saveTransactions(transactions);

        deleteModal.classList.remove("active");

        deleteId = null;

        loadDashboard();

        showToast("Transaction deleted successfully!", "success");

    });

});

// Dashboard
// ==========================

function loadDashboard() {

    const transactions =
        filterTransactions(getTransactions());
    updateDashboardStats(transactions);

    loadTransactionTable(transactions);

    setupSearch(transactions);

    setupCategoryFilter(transactions);

    setupSorting(transactions);

    setupExportCSV();

    updateFinancialHealth(transactions);

    updateInsights(transactions);

    updateAnalyticsCards(transactions);

    updateTopExpenses(transactions);

    updateMonthlyComparison(transactions);

    if (typeof loadCharts === "function") {
        loadCharts();
    }

    if (typeof loadMonthlyTrendChart === "function") {
        loadMonthlyTrendChart();
    }
}
// ==========================
// Transaction Table
// ==========================
function loadTransactionTable(transactions) {

    const table = document.getElementById("transactionTable");

    if (!table) return;

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
<tr class="fade-in">
    <td>🔥 ${item.category}</td>
<td><strong>${formatCurrency(item.amount)}</strong></td>    <td>${item.date}</td>
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

    const totalIncome = getIncome();

    const totalBalance = totalIncome - totalExpense;
    const totalSavings = totalBalance;
    const budget = getBudget();
    const budgetLeft = budget - totalExpense;

    const budgetPercent =
        budget > 0
            ? Math.round((budgetLeft / budget) * 100)
            : 0;

    // Update Cards
    animateValue("totalIncome", 0, totalIncome);

    animateValue("totalExpense", 0, totalExpense);

    animateValue("totalBalance", 0, totalBalance);

    animateValue("totalSavings", 0, Math.max(0, totalSavings));

    document.getElementById("cashFlow").textContent =
        totalBalance >= 0 ? "Positive" : "Negative";

    document.getElementById("budgetLeft").textContent =
        formatCurrency(Math.max(0, budgetLeft));

    document.getElementById("budgetPercent").textContent =
        `${budgetPercent}%`;

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

        const transactions =
            filterTransactions(getTransactions());
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

    const totalIncome = getIncome();
    let score = 0;

    if (totalIncome > 0) {

        score = Math.max(
            0,
            Math.min(
                100,
                Math.round((1 - totalExpense / totalIncome) * 100)
            )
        );

    }

    animateNumber("healthScore", score);

    const circle = document.getElementById("healthProgress");

    if (!circle) return;

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

    if (!status) return;
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

        list.innerHTML = `
            <li>💸 No transactions available.</li>
        `;

        return;

    }

    const income = getIncome();
    const budget = getBudget();

    let totalExpense = 0;

    const categoryTotals = {};

    transactions.forEach(item => {

        const amount = Number(item.amount);

        totalExpense += amount;

        if (!categoryTotals[item.category]) {

            categoryTotals[item.category] = 0;

        }

        categoryTotals[item.category] += amount;

    });

    // Highest Category
    let highestCategory = "-";
    let highestAmount = 0;

    for (const category in categoryTotals) {

        if (categoryTotals[category] > highestAmount) {

            highestAmount = categoryTotals[category];

            highestCategory = category;

        }

    }

    const budgetUsed =
        budget > 0
            ? ((totalExpense / budget) * 100).toFixed(1)
            : 0;

    // Total Spent
    list.innerHTML += `
    <li>💰 Total Spent: <strong>${formatCurrency(totalExpense)}</strong></li>
`;

    // Highest Category
    list.innerHTML += `
        <li>🔥 Highest Spending: <strong>${highestCategory}</strong></li>
    `;

    // Budget Used
    list.innerHTML += `
        <li>📊 Budget Used: <strong>${budgetUsed}%</strong></li>
    `;

    // Budget Status
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
    list.innerHTML += `
        <li>💡 Reduce <strong>${highestCategory}</strong> spending to save more.</li>
    `;

    // Savings
    const remaining = budget - totalExpense;

    list.innerHTML += `
    <li>💵 Budget Remaining: <strong>${formatCurrency(Math.max(0, remaining))}</strong></li>
`;

}
function updateAnalyticsCards(transactions) {

    // Total Transactions
    document.getElementById("transactionCountCard").textContent =
        transactions.length;

    let total = 0;

    let largestExpense = 0;

    let smallestExpense = 0;

    const categoryTotals = {};

    const categories = new Set();

    transactions.forEach(item => {

        const amount = Number(item.amount);

        total += amount;

        categories.add(item.category);

        if (amount > largestExpense) {

            largestExpense = amount;

        }

        if (smallestExpense === 0 || amount < smallestExpense) {

            smallestExpense = amount;

        }

        if (!categoryTotals[item.category]) {

            categoryTotals[item.category] = 0;

        }

        categoryTotals[item.category] += amount;

    });

    // Average
    const average =
        transactions.length
            ? Math.round(total / transactions.length)
            : 0;

    document.getElementById("averageExpenseCard").textContent =
        `₹${average.toLocaleString()}`;

    // Highest Category
    let highestCategory = "-";

    let highestAmount = 0;

    for (const category in categoryTotals) {

        if (categoryTotals[category] > highestAmount) {

            highestAmount = categoryTotals[category];

            highestCategory = category;

        }

    }

    document.getElementById("highestCategoryCard").textContent =
        highestCategory;

    // Largest Expense
    document.getElementById("largestExpenseCard").textContent =
        `₹${largestExpense.toLocaleString()}`;

    // Smallest Expense
    document.getElementById("smallestExpenseCard").textContent =
        `₹${smallestExpense.toLocaleString()}`;

    // Categories Used
    document.getElementById("categoriesUsedCard").textContent =
        categories.size;

}

function updateTopExpenses(transactions) {

    const container =
        document.getElementById("topExpensesList");

    if (!container) return;

    container.innerHTML = "";

    if (transactions.length === 0) {

        container.innerHTML = "<p>No transactions found.</p>";

        return;

    }

    const sorted = [...transactions]
        .sort((a, b) => Number(b.amount) - Number(a.amount))
        .slice(0, 5);

    sorted.forEach((item, index) => {

        const date = new Date(item.date);

        const formattedDate =
            date.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            });

        container.innerHTML += `

        <div class="expense-rank">

            <div class="rank-left">

                <div class="rank-number">
                    ${index + 1}
                </div>

                <div>

                    <div class="rank-category">
                        ${item.category}
                    </div>

                    <small>${formattedDate}</small>

                </div>

            </div>

            <div class="rank-amount">
                ₹${Number(item.amount).toLocaleString()}
            </div>

        </div>

    `;

    });

}

function updateMonthlyComparison(transactions) {

    const today = new Date();

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    let currentTotal = 0;
    let previousTotal = 0;

    transactions.forEach(item => {

        const d = new Date(item.date);

        const amount = Number(item.amount);

        if (
            d.getMonth() === currentMonth &&
            d.getFullYear() === currentYear
        ) {

            currentTotal += amount;

        }

        else if (

            (
                currentMonth === 0 &&
                d.getMonth() === 11 &&
                d.getFullYear() === currentYear - 1
            )

            ||

            (
                d.getMonth() === currentMonth - 1 &&
                d.getFullYear() === currentYear
            )

        ) {

            previousTotal += amount;

        }

    });

    const currentMonthExpense =
        document.getElementById("currentMonthExpense");

    const previousMonthExpense =
        document.getElementById("previousMonthExpense");

    if (!currentMonthExpense || !previousMonthExpense) return;
    currentMonthExpense.textContent =
        formatCurrency(currentTotal);

    previousMonthExpense.textContent =
        formatCurrency(previousTotal);

    const message =
        document.getElementById("comparisonMessage");

    if (!message) return;

    if (previousTotal === 0) {

        message.innerHTML =
            "📌 No expenses were recorded last month.";

        return;

    }

    const difference =
        currentTotal - previousTotal;

    const percent =
        ((difference / previousTotal) * 100).toFixed(1);

    if (difference > 0) {

        message.innerHTML =
            `📈 Spending increased by <strong>${formatCurrency(difference)}</strong> (${percent}%).`;

    }

    else if (difference < 0) {

        message.innerHTML =
            `📉 Spending decreased by <strong>${formatCurrency(Math.abs(difference))}</strong> (${Math.abs(percent)}%).`;

    }

    else {

        message.innerHTML =
            "➖ Spending is exactly the same as last month.";

    }

}

document.querySelectorAll(".filter-btn").forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelector(".filter-btn.active")
            ?.classList.remove("active");

        btn.classList.add("active");

        currentFilter = btn.dataset.filter;

        loadDashboard();

    });

});

function loadTransactionsPage() {

    const tbody = document.getElementById("transactionsTableBody");

    if (!tbody) return;

    const transactions = getTransactions();

    tbody.innerHTML = "";

    if (transactions.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center;">
                    No transactions found.
                </td>
            </tr>
        `;

        return;
    }

    transactions.forEach(item => {

        tbody.innerHTML += `
            <tr>

                <td>${new Date(item.date).toLocaleDateString()}</td>

                <td>${item.category}</td>

                <td>₹${Number(item.amount).toLocaleString()}</td>

                <td>${item.note}</td>

                <td>
                    <button onclick="editTransaction(${item.id})">
                        ✏️
                    </button>

                    <button onclick="deleteTransaction(${item.id})">
                        🗑️
                    </button>
                </td>

            </tr>
        `;

    });

}