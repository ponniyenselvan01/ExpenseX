function loadAnalytics() {

    const transactions = getTransactions();
    const income = getIncome();

    let expense = 0;

    transactions.forEach(item => {
        expense += Number(item.amount);
    });

    document.getElementById("analyticsTotalExpense").textContent =
        "₹" + expense.toLocaleString();

    document.getElementById("analyticsTotalIncome").textContent =
        "₹" + income.toLocaleString();

    document.getElementById("analyticsTotalSavings").textContent =
        "₹" + (income - expense).toLocaleString();

    document.getElementById("analyticsTransactionCount").textContent =
        transactions.length;
    // Highest Category
    const categoryTotals = {};

    transactions.forEach(item => {
        categoryTotals[item.category] =
            (categoryTotals[item.category] || 0) + Number(item.amount);
    });

    let highestCategory = "-";
    let highestAmount = 0;

    for (const category in categoryTotals) {
        if (categoryTotals[category] > highestAmount) {
            highestAmount = categoryTotals[category];
            highestCategory = category;
        }
    }

    // Largest Expense
    const largestExpense = transactions.length
        ? Math.max(...transactions.map(item => Number(item.amount)))
        : 0;

    // Average Expense
    const averageExpense = transactions.length
        ? Math.round(expense / transactions.length)
        : 0;

    // Budget Used
    const budget = getBudget();

    const budgetUsed = budget > 0
        ? Math.round((expense / budget) * 100)
        : 0;

    // Update Cards
    document.getElementById("highestCategoryAnalytics").textContent =
        highestCategory;

    document.getElementById("largestExpenseAnalytics").textContent =
        "₹" + largestExpense.toLocaleString();

    document.getElementById("averageExpenseAnalytics").textContent =
        "₹" + averageExpense.toLocaleString();

    document.getElementById("budgetUsedAnalytics").textContent =
        budgetUsed + "%";
    if (typeof loadAnalyticsCharts === "function") {
        loadAnalyticsCharts();
    }

}