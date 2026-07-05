document.addEventListener("DOMContentLoaded", () => {

    const lineCtx = document.getElementById("lineChart");

    if (lineCtx) {

        new Chart(lineCtx, {

            type: "line",

            data: {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [{
                    label: "Expenses",
                    data: [450, 620, 510, 900, 700, 850, 680],
                    borderColor: "#5B5FEF",
                    backgroundColor: "rgba(91,95,239,.15)",
                    fill: true,
                    tension: .4
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
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

        new Chart(pieCtx, {

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
});