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

        new Chart(pieCtx, {

            type: "doughnut",

            data: {
                labels: ["Food", "Travel", "Shopping", "Bills", "Health"],
                datasets: [{
                    data: [35, 20, 18, 15, 12],
                    backgroundColor: [
                        "#5B5FEF",
                        "#00C896",
                        "#FFB703",
                        "#FF5A5F",
                        "#7C4DFF"
                    ]
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