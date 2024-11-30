const calendarBody = document.getElementById("calendar-body");
const currentMonthElem = document.getElementById("current-month");
const monthDropdown = document.getElementById("month-dropdown");
const monthButton = document.getElementById("month-button");
const prevMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function updateCalendar(month, year) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  calendarBody.innerHTML = ""; // Clear previous days

  for (let i = 0; i < firstDay; i++) {
    calendarBody.innerHTML += `<div class="day"></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarBody.innerHTML += `
      <div class="day" data-tooltip="You have scheduled a meeting with User1!">${day}</div>`;
  }

  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });
  currentMonthElem.textContent = `${monthName} ${year}`;
}

function changeMonth(offset) {
  currentMonth += offset;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateCalendar(currentMonth, currentYear);
}

monthButton.addEventListener("click", () => {
  monthDropdown.classList.toggle("hidden");
});


monthDropdown.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    currentMonth = parseInt(e.target.dataset.month, 10);
    updateCalendar(currentMonth, currentYear);
    monthDropdown.classList.add("hidden"); // Hide dropdown after selection
  }
});


document.addEventListener("click", (e) => {
  if (!monthButton.contains(e.target) && !monthDropdown.contains(e.target)) {
    monthDropdown.classList.add("hidden");
  }
});

prevMonthButton.addEventListener("click", () => changeMonth(-1));
nextMonthButton.addEventListener("click", () => changeMonth(1));


updateCalendar(currentMonth, currentYear);
