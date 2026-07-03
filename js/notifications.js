function showToast(message, type = "success") {

    const container = document.getElementById("toastContainer");

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    let icon = "✅";

    if (type === "error") icon = "❌";

    if (type === "warning") icon = "⚠️";

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