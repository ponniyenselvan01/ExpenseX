let monthlyTrendChart;
let expenseChart;
let pieChart;
function loadCharts() {
    if (typeof Chart === "undefined") return;

    const lineCtx = document.getElementById("lineChart");

    if (lineCtx) {

        const transactions = getTransactions();

        const categoryTotals = {};

        transactions.forEach(item => {

            if (!categoryTotals[item.category]) {

                categoryTotals[item.category] = 0;

            }

            categoryTotals[item.category] += Number(item.amount);

        });

        const labels = Object.keys(categoryTotals);

        const values = Object.values(categoryTotals);

        if (expenseChart) {

            expenseChart.destroy();

        }

        expenseChart = new Chart(lineCtx, {

            type: "bar",
            data: {

                labels,

                datasets: [{

                    label: "Expense by Category",

                    data: values,

                    backgroundColor: [
                        "#5b5fef",
                        "#00c896",
                        "#ffb703",
                        "#ff5a5f",
                        "#7c4dff",
                        "#00b8d9",
                        "#8bc34a"
                    ],

                    borderRadius: 10,

                    borderSkipped: false

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        display: false

                    },

                    tooltip: {

                        callbacks: {

                            label: function (context) {

                                return "₹" + context.raw.toLocaleString();

                            }

                        }

                    }

                },

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {

                            callback: function (value) {

                                return "₹" + value;

                            }

                        }

                    }

                }

            }

        });

    }
    const pieCtx = document.getElementById("pieChart");

    if (pieCtx) {

        const transactions = getTransactions();

        const categoryTotals = {};

        transactions.forEach(item => {

            if (!categoryTotals[item.category]) {

                categoryTotals[item.category] = 0;

            }

            categoryTotals[item.category] += Number(item.amount);

        });

        const labels = Object.keys(categoryTotals);

        const data = Object.values(categoryTotals);

        const colors = [
            "#5b5fef",
            "#00c896",
            "#ffb703",
            "#ff5a5f",
            "#7c4dff",
            "#00b8d9",
            "#8bc34a"
        ];

        if (pieChart) {

            pieChart.destroy();

        }

        pieChart = new Chart(pieCtx, {

            type: "doughnut",

            data: {

                labels,

                datasets: [{

                    data,

                    backgroundColor: colors.slice(0, labels.length)

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "65%"

            }

        });

    }
}

document.addEventListener("DOMContentLoaded", loadCharts);
function loadMonthlyTrendChart() {
    if (typeof Chart === "undefined") return;


    const ctx = document.getElementById("monthlyTrendChart");

    if (!ctx) return;

    const transactions = getTransactions();

    const labels = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const data = new Array(12).fill(0);

    transactions.forEach(item => {

        const date = new Date(item.date);

        const monthIndex = date.getMonth();

        data[monthIndex] += Number(item.amount);

    });

    if (monthlyTrendChart) {
        monthlyTrendChart.destroy();
    }

    monthlyTrendChart = new Chart(ctx, {

        type: "line",

        data: {

            labels,

            datasets: [{

                label: "Monthly Spending",

                data,

                borderColor: "#6366F1",

                backgroundColor: "rgba(99,102,241,0.18)",

                borderWidth: 3,

                pointRadius: 5,

                pointHoverRadius: 7,

                pointBackgroundColor: "#6366F1",

                pointBorderColor: "#fff",

                pointBorderWidth: 2,

                fill: true,

                tension: 0.2

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {
                mode: "index",
                intersect: false
            },

            plugins: {

                legend: {
                    display: false
                },

                tooltip: {

                    backgroundColor: "#1f2937",

                    titleColor: "#fff",

                    bodyColor: "#fff",

                    displayColors: false,

                    callbacks: {

                        label: function (context) {
                            return `₹${context.parsed.y.toLocaleString()}`;
                        }

                    }

                }

            },

            scales: {

                x: {

                    ticks: {

                        color: "#aab2c8"

                    },

                    grid: {

                        display: false

                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {

                        color: "#AAB2C8",

                        callback: function (value) {
                            return "₹" + value;
                        }

                    },

                    grid: {

                        color: "rgba(255,255,255,0.06)"

                    }

                }

            }

        }

    });

}
loadMonthlyTrendChart();
let incomeExpenseChart;
let analyticsPieChart;
function loadAnalyticsCharts() {

    if (typeof Chart === "undefined") return;

    const incomeCtx = document.getElementById("incomeExpenseChart");
    const pieCtx = document.getElementById("analyticsPieChart");

    const transactions = getTransactions();

    const income = getIncome();

    let expense = 0;

    const categories = {};

    transactions.forEach(item => {

        expense += Number(item.amount);

        categories[item.category] =
            (categories[item.category] || 0) + Number(item.amount);

    });

    // ------------------------
    // Income vs Expense Chart
    // ------------------------

    if (incomeCtx) {

        if (incomeExpenseChart) {
            incomeExpenseChart.destroy();
        }

        incomeExpenseChart = new Chart(incomeCtx, {

            type: "bar",

            data: {

                labels: ["Income", "Expense"],

                datasets: [{

                    data: [income, expense],

                    backgroundColor: [
                        "#22c55e",
                        "#ef4444"
                    ],

                    borderRadius: 10

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {

                        beginAtZero: true

                    }

                }

            }

        });

    }

    // ------------------------
    // Category Pie Chart
    // ------------------------

    if (pieCtx) {

        if (analyticsPieChart) {
            analyticsPieChart.destroy();
        }

        analyticsPieChart = new Chart(pieCtx, {

            type: "doughnut",

            data: {

                labels: Object.keys(categories),

                datasets: [{

                    data: Object.values(categories),

                    backgroundColor: [

                        "#6366F1",
                        "#F59E0B",
                        "#10B981",
                        "#EF4444",
                        "#8B5CF6",
                        "#06B6D4",
                        "#84CC16"

                    ]

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "60%"

            }

        });

    }

}