let monthlyTrendChart;
let expenseChart;
let pieChart;
function loadCharts() {

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
                        "#5B5FEF",
                        "#00C896",
                        "#FFB703",
                        "#FF5A5F",
                        "#7C4DFF",
                        "#00B8D9",
                        "#8BC34A"
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
            "#5B5FEF",
            "#00C896",
            "#FFB703",
            "#FF5A5F",
            "#7C4DFF",
            "#00B8D9",
            "#8BC34A"
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

    const ctx = document.getElementById("monthlyTrendChart");

    if (!ctx) return;

    const transactions = getTransactions();

    const monthlyTotals = {};

    transactions.forEach(item => {

        const date = new Date(item.date);

        const month = date.toLocaleString("default", {
            month: "short"
        });

        if (!monthlyTotals[month]) {
            monthlyTotals[month] = 0;
        }

        monthlyTotals[month] += Number(item.amount);

    });

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
    labels,
        data

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

                backgroundColor: "rgba(99,102,241,.18)",

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

                    backgroundColor: "#1F2937",

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

                        color: "#AAB2C8"

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

                        color: "rgba(255,255,255,.06)"

                    }

                }

            }

        }

    });

}
loadMonthlyTrendChart();