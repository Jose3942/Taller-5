import { renderMonthlyCalendar, renderDailyCalendar, renderYearlyCalendar } from "./renderCalendars.mjs";

export function updateViews() {
  const views = ["month", "year", "day"];
  views.forEach((view) => {
    const calendar = document.querySelector(`#calendar-${view}`);
    calendar.innerHTML = "";
  });

  renderMonthlyCalendar();
  renderYearlyCalendar();
  renderDailyCalendar();
}

export function addListeners() {
  const views = ["day", "month", "year"];
  views.forEach((view) => {
    document.querySelector(`#view-${view}`).addEventListener("click", () => {
      views.forEach((v) => {
        const calendar = document.querySelector(`#calendar-${v}`);
        if (v === view) {
          calendar.classList.add("grid");
          calendar.classList.remove("hidden");
        } else {
          calendar.classList.add("hidden");
          calendar.classList.remove("grid");
        }
      });
    });
  });
}

export function loadDaysWithEvents() {
  const daysWithEventsString = localStorage.getItem("daysWithEvents");
  if (daysWithEventsString) {
    return JSON.parse(daysWithEventsString);
  }
  return [];
}
