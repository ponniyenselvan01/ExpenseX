function animateValue(elementId, start, end, duration = 800) {

    const element = document.getElementById(elementId);

    const range = end - start;

    let startTime = null;

    function update(currentTime) {

        if (!startTime) startTime = currentTime;

        const progress = Math.min((currentTime - startTime) / duration, 1);

        const value = Math.floor(progress * range + start);

        element.textContent = "₹" + value.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }

    }

    requestAnimationFrame(update);

}