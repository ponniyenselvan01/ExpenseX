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