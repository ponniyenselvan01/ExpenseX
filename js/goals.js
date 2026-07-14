function loadGoals() {

    const goal = getGoal();
    const savings = getCurrentSavings();
    const percentage = getGoalPercentage();

    const currentSavings = document.getElementById("currentSavingsGoal");
    const goalDisplay = document.getElementById("goalAmountDisplay");
    const remaining = document.getElementById("remainingGoal");
    const progress = document.getElementById("goalProgress");
    const percentageText = document.getElementById("goalPercentage");
    const goalMessage = document.getElementById("goalMessage");
    const goalInput = document.getElementById("goalAmount");
    if (!currentSavings || !progress || !percentageText || !goalInput) return;

    currentSavings.textContent = "₹" + savings.toLocaleString();
    goalDisplay.textContent = "₹" + goal.toLocaleString();

    remaining.textContent =
        "₹" + Math.max(goal - savings, 0).toLocaleString();

    progress.style.width = percentage + "%";
    if (percentage >= 100) {
        progress.style.background = "#22c55e";
    } else if (percentage >= 40) {
        progress.style.background = "#f59e0b";
    } else {
        progress.style.background = "#ef4444";
    }

    percentageText.textContent = percentage + "% Completed";
    if (percentage >= 100) {

        goalMessage.textContent =
            "🎉 Congratulations! Goal Achieved.";

    } else {

        goalMessage.textContent = "";

    }
    goalInput.placeholder = goal
        ? "Current Goal: ₹" + goal.toLocaleString()
        : "Enter Savings Goal";

    goalInput.value = "";
}

const saveGoalBtn = document.getElementById("saveGoalBtn");

if (saveGoalBtn) {

    saveGoalBtn.addEventListener("click", () => {

        const goal = Number(
            document.getElementById("goalAmount").value
        );

        if (goal <= 0) {

            showToast("Enter a valid goal.", "warning");
            return;

        }

        saveGoal(goal);

        loadGoals();

        showToast("Goal saved successfully!");

    });

}

document.addEventListener("DOMContentLoaded", loadGoals);