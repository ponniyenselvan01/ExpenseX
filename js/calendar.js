const calendarGrid = document.getElementById("calendarGrid");
const calendarMonth = document.getElementById("calendarMonth");

let currentDate = new Date();

function loadCalendar() {

    if (!calendarGrid) return;

    calendarGrid.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    calendarMonth.textContent =
        currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric"
        });

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    days.forEach(day => {
        calendarGrid.innerHTML += `
            <div class="calendar-day-name">${day}</div>
        `;
    });

    for (let i = 0; i < firstDay; i++) {
        calendarGrid.innerHTML += `<div></div>`;
    }

    for (let day = 1; day <= totalDays; day++) {

        calendarGrid.innerHTML += `
            <div class="calendar-day">
                ${day}
            </div>
        `;

    }

}

loadCalendar();