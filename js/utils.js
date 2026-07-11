// ==========================
// Animate Currency Value
// ==========================

function animateValue(elementId, start, end, duration = 800) {

    const element = document.getElementById(elementId);

    if (!element) return;

    if (duration <= 0) {
        element.textContent = "₹" + end.toLocaleString();
        return;
    }

    const range = end - start;
    let startTime = null;

    function update(currentTime) {

        if (!startTime) {
            startTime = currentTime;
        }

        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        const value = Math.floor(start + range * progress);

        element.textContent = "₹" + value.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }

    }

    requestAnimationFrame(update);

}

// ==========================
// Animate Number
// ==========================

function animateNumber(elementId, endValue, duration = 1000) {

    const element = document.getElementById(elementId);

    if (!element) return;

    if (duration <= 0) {
        element.textContent = endValue;
        return;
    }

    let start = 0;
    const increment = endValue / (duration / 16);

    function update() {

        start += increment;

        if (start >= endValue) {

            element.textContent = endValue;

            return;

        }

        element.textContent = Math.floor(start);

        requestAnimationFrame(update);

    }

    requestAnimationFrame(update);

}