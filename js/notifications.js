function showToast(message, type = "success") {

    const container = document.getElementById("toastContainer");

    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const icons = {
        success: "✅",
        error: "❌",
        warning: "⚠️"
    };

    const icon = icons[type] || "✅";

    toast.innerHTML = `
        <span>${icon}</span>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {

        toast.style.animation = "toastOut .35s forwards";

        setTimeout(() => {

            toast.remove();

        }, 350);

    }, 3000);

}