import { daysWithEvents, months, days } from "./variables.mjs";
import { renderDays } from "./renderDays.mjs";
import { updateViews } from "./logicManager.mjs";

export function renderYearlyCalendar() {
  const calendarYearContainer = document.querySelector("#calendar-year");
  const date = new Date();

  months.forEach((month, index) => {
    const yearArticle = document.createElement("article");
    yearArticle.classList.add("col-span-1", "border");
    yearArticle.id = `view-year-${month.id}`;

    const yearHeading = document.createElement("h2");
    yearHeading.classList.add("text-xl", "bg-secondary", "p-2", "text-secondary-content", "text-center", "font-semibold");
    yearHeading.textContent = month.name;

    const yearSection = document.createElement("section");
    yearSection.classList.add("grid", "grid-cols-7", "gap-2", "flex-grow", "p-2");
    yearSection.id = `calendar-day-${month.id}`;

    days.forEach((day) => {
      const dayArticle = document.createElement("article");
      dayArticle.classList.add("col-span-1", "place-content-center");
      dayArticle.id = `view-day-${day.id}-${month.id}`;

      const dayHeading = document.createElement("h2");
      dayHeading.classList.add("text-xl", "text-center", "font-medium");
      dayHeading.textContent = day.shortName;

      dayArticle.appendChild(dayHeading);
      yearSection.appendChild(dayArticle);
    });

    yearArticle.appendChild(yearHeading);
    yearArticle.appendChild(yearSection);
    calendarYearContainer.appendChild(yearArticle);

    renderDays(date.getFullYear(), index, yearSection, 2);
  });
}

export function renderMonthlyCalendar() {
  const calendarDayContainer = document.querySelector("#calendar-month");
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  const monthHeader = renderMonthlyCalendarHeader(date, month, year, calendarDayContainer);
  calendarDayContainer.appendChild(monthHeader);

  days.forEach((day) => {
    const monthArticle = document.createElement("article");
    monthArticle.classList.add("col-span-1", "place-content-center");
    monthArticle.id = `view-day-${day.id}`;

    const monthHeading = document.createElement("h2");
    monthHeading.classList.add("sm:text-xs", "md:text-sm", "lg:text-xl", "bg-secondary", "p-2", "text-secondary-content", "text-center", "font-semibold");
    monthHeading.textContent = day.name;

    monthArticle.appendChild(monthHeading);
    calendarDayContainer.appendChild(monthArticle);
  });

  renderDays(year, month, calendarDayContainer, 6);
}

export function renderDailyCalendar() {
  const calendarDayContainer = document.querySelector("#calendar-day");

  daysWithEvents.forEach((day) => {
    const dayArticle = document.createElement("article");
    dayArticle.classList.add("col-span-1", "place-content-center", "border");
    dayArticle.id = `view-day-${day.day}-${day.month}-${day.year}`;

    const dayHeading = document.createElement("header");
    dayHeading.classList.add("text-xl", "bg-secondary", "p-2", "text-secondary-content", "text-center", "font-semibold", "flex", "justify-between", "items-center");

    const dayHeadingSpan = document.createElement("span");
    dayHeadingSpan.textContent = `${day.day} de ${months[day.month].name} de ${day.year}`;
    dayHeading.appendChild(dayHeadingSpan);

    const dayHeadingDelete = document.createElement("button");
    dayHeadingDelete.classList.add("btn", "btn-ghost", "btn-xs", "rounded-full");
    dayHeadingDelete.textContent = "Eliminar";
    dayHeadingDelete.onclick = () => {
      const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este evento?");
      if (!confirmDelete) return;

      daysWithEvents.splice(daysWithEvents.indexOf(day), 1);
      localStorage.setItem("daysWithEvents", JSON.stringify(daysWithEvents));
      updateViews();
    };

    dayHeading.appendChild(dayHeadingDelete);

    const dayDescription = document.createElement("p");
    dayDescription.classList.add("text-lg", "font-normal", "p-2");
    dayDescription.textContent = day.description;

    const dayParticipants = document.createElement("p");
    dayParticipants.classList.add("text-lg", "font-normal", "p-2", "italic", "text-gray-500");
    dayParticipants.textContent = day.participants;

    const dayParticipantsHeading = document.createElement("span");
    dayParticipantsHeading.classList.add("font-semibold");
    dayParticipantsHeading.textContent = "Participantes: ";
    dayParticipants.prepend(dayParticipantsHeading);

    const timeDiv = document.createElement("div");
    timeDiv.classList.add("text-center", "breadcrumbs", "self-center", "p-2", "text-lg", "font-normal", "text-primary-content");

    const timeUl = document.createElement("ul");
    timeUl.classList.add("flex", "justify-center", "border-t-2");

    const initTimeLi = document.createElement("li");
    initTimeLi.textContent = day.initTime;
    timeUl.appendChild(initTimeLi);

    const finishTimeLi = document.createElement("li");
    finishTimeLi.textContent = day.finishTime;
    timeUl.appendChild(finishTimeLi);

    timeDiv.appendChild(timeUl);

    dayArticle.appendChild(dayHeading);
    dayArticle.appendChild(dayDescription);
    dayArticle.appendChild(dayParticipants);
    dayArticle.appendChild(timeDiv);
    calendarDayContainer.appendChild(dayArticle);
  });
}

/**
 * @param {Date} date
 * @param {number} month
 * @param {number} year
 * @param {HTMLDivElement} calendarDayContainer
 */
function renderMonthlyCalendarHeader(date, month, year, calendarDayContainer) {
  const monthHeader = document.createElement("header");
  monthHeader.classList.add("flex", "justify-between", "items-center", "bg-primary", "py-2", "mb-3", "col-span-full");

  const prevMonthButton = document.createElement("button");
  prevMonthButton.classList.add("btn", "btn-primary", "px-10");
  prevMonthButton.id = "prev-month";
  prevMonthButton.textContent = "Anterior";
  prevMonthButton.onclick = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
    const newMonth = newDate.getMonth();
    const newYear = newDate.getFullYear();

    calendarDayContainer.innerHTML = "";
    const header = renderMonthlyCalendarHeader(newDate, newMonth, newYear, calendarDayContainer);
    calendarDayContainer.appendChild(header);
    renderDays(newYear, newMonth, calendarDayContainer, 6);
  };

  const monthName = document.createElement("h2");
  monthName.textContent = `${months[month].name} de ${year}`;
  monthName.classList.add("text-2xl", "text-center", "text-neutral-content", "font-semibold");

  const nextMonthButton = document.createElement("button");
  nextMonthButton.classList.add("btn", "btn-primary", "px-10");
  nextMonthButton.id = "next-month";
  nextMonthButton.textContent = "Siguiente";
  nextMonthButton.onclick = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const newMonth = newDate.getMonth();
    const newYear = newDate.getFullYear();

    calendarDayContainer.innerHTML = "";
    const header = renderMonthlyCalendarHeader(newDate, newMonth, newYear, calendarDayContainer);
    calendarDayContainer.appendChild(header);
    renderDays(newYear, newMonth, calendarDayContainer, 6);
  };

  monthHeader.appendChild(prevMonthButton);
  monthHeader.appendChild(monthName);
  monthHeader.appendChild(nextMonthButton);

  return monthHeader;
}
