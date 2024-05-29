import { createModal } from "./modal.mjs";
import { daysWithEvents } from "./variables.mjs";
import { updateViews } from "./logicManager.mjs";

/**
 * @param {number} year
 * @param {number} month
 * @param {HTMLElement} container
 * @param {number} padding
 */
export function renderDays(year, month, container, padding) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  for (let i = 0; i < firstDayOfWeek; i++) {
    const div = document.createElement("div");
    div.classList.add("text-center", `py-${padding}`, "active");
    container.appendChild(div);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dialog = createModal(day, month, year);
    const button = document.createElement("button");
    button.id = `button-day-${day}-${month}-${year}`;
    button.onclick = (e) => dayButtonHandler(e, day, month, year);
    button.textContent = day;

    if (daysWithEvents.some((d) => d.day === day && d.month === month && d.year === year)) {
      button.classList.add("text-center", `py-${padding}`, "rounded-md", "bg-accent", "text-accent-content");
    } else {
      button.classList.add("text-center", `py-${padding}`, "hover:bg-gray-200", "transition-colors", "rounded-md");
    }

    container.appendChild(button);
    container.appendChild(dialog);
  }
}

/**
 * @param {MouseEvent} e
 * @param {number} day
 * @param {number} month
 * @param {number} year
 */
export function dayButtonHandler(e, day, month, year) {
  e.preventDefault();
  const dialog = document.querySelector(`#day-${day}-${month}-${year}`);
  dialog.showModal();
}

/**
 * @param {object} event
 * @param {number} event.day
 * @param {number} event.month
 * @param {number} event.year
 * @param {string} event.description
 * @param {string} event.participants
 * @param {string} event.initTime
 * @param {string} event.finishTime
 */
export function addDayEvent({ day, month, year, description, participants, initTime, finishTime }) {
  const button = document.querySelector(`#button-day-${day}-${month}-${year}`);
  button.classList.add("bg-accent", "text-accent-content");
  button.classList.remove("hover:bg-gray-200");

  daysWithEvents.push({ day, month, year, description, participants, initTime, finishTime });
  localStorage.setItem("daysWithEvents", JSON.stringify(daysWithEvents));
  updateViews();
}
