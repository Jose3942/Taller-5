import { months } from "./variables.mjs";
import { addDayEvent } from "./renderDays.mjs";

/**
 * @param {number} day
 * @param {number} month
 * @param {number} year
 */
export function createModal(day, month, year) {
  const modal = document.createElement("dialog");
  modal.id = `day-${day}-${month}-${year}`;
  modal.classList.add("modal", "modal-bottom", "sm:modal-middle");

  const modalBox = document.createElement("div");
  modalBox.classList.add("modal-box");

  const modalHeading = document.createElement("h3");
  modalHeading.classList.add("font-bold", "text-lg");
  modalHeading.textContent = `Agregar evento para el ${day} de ${months[month].name} de ${year}`;

  const form = renderForm();
  const modalActions = renderModalActions(day, month, year, modal, form);

  modalBox.appendChild(modalHeading);
  modalBox.appendChild(form);
  modalBox.appendChild(modalActions);
  modal.appendChild(modalBox);

  return modal;
}

function renderForm() {
  const form = document.createElement("form");
  form.classList.add("form", "grid", "grid-cols-2", "gap-4");

  const descriptionLabel = renderDescriptionInput();
  const participantsLabel = renderParticipantsInput();
  const initTimeLabel = renderTimeInput("init-time", "Hora de inicio");
  const finishTimeLabel = renderTimeInput("finish-time", "Hora de finalización");

  form.appendChild(descriptionLabel);
  form.appendChild(participantsLabel);
  form.appendChild(initTimeLabel);
  form.appendChild(finishTimeLabel);

  return form;
}

function renderDescriptionInput(day) {
  const descriptionLabel = document.createElement("label");
  descriptionLabel.classList.add("form-control", "col-span-full");

  const descriptionLabelDiv = document.createElement("div");
  descriptionLabelDiv.classList.add("label");

  const descriptionLabelText = document.createElement("span");
  descriptionLabelText.classList.add("label-text");
  descriptionLabelText.textContent = "Evento";

  const descriptionTextarea = document.createElement("textarea");
  descriptionTextarea.required = true;
  descriptionTextarea.id = "description";
  descriptionTextarea.classList.add("textarea", "textarea-bordered", "w-full");
  descriptionTextarea.placeholder = "Ingrese la descripción del evento";

  descriptionLabelDiv.appendChild(descriptionLabelText);
  descriptionLabel.appendChild(descriptionLabelDiv);
  descriptionLabel.appendChild(descriptionTextarea);

  return descriptionLabel;
}

function renderParticipantsInput() {
  const participantsLabel = document.createElement("label");
  participantsLabel.classList.add("form-control", "col-span-full");

  const participantsLabelDiv = document.createElement("div");
  participantsLabelDiv.classList.add("label");

  const participantsLabelText = document.createElement("span");
  participantsLabelText.classList.add("label-text");
  participantsLabelText.textContent = "Participantes";

  const participantsInput = document.createElement("input");
  participantsInput.required = true;
  participantsInput.id = "participants";
  participantsInput.classList.add("input", "input-bordered", "w-full");
  participantsInput.type = "text";
  participantsInput.placeholder = "Ingrese los participantes del evento";

  participantsLabelDiv.appendChild(participantsLabelText);
  participantsLabel.appendChild(participantsLabelDiv);
  participantsLabel.appendChild(participantsInput);

  return participantsLabel;
}

/**
 * @param {string} id
 * @param {string} label
 */
function renderTimeInput(id, label) {
  const timeLabel = document.createElement("label");
  timeLabel.classList.add("form-control");

  const timeLabelDiv = document.createElement("div");
  timeLabelDiv.classList.add("label");

  const timeLabelText = document.createElement("span");
  timeLabelText.classList.add("label-text");
  timeLabelText.textContent = label;

  const timeInput = document.createElement("input");
  timeInput.required = true;
  timeInput.id = id;
  timeInput.classList.add("input", "input-bordered", "w-full");
  timeInput.type = "time";
  timeInput.name = "time";
  timeInput.step = "1800";

  timeLabelDiv.appendChild(timeLabelText);
  timeLabel.appendChild(timeLabelDiv);
  timeLabel.appendChild(timeInput);

  return timeLabel;
}

/**
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @param {HTMLDialogElement} modal
 * @param {HTMLFormElement} form
 */
function renderModalActions(day, month, year, modal, form) {
  const modalActions = document.createElement("div");
  modalActions.classList.add("modal-action");

  const actionsForm = document.createElement("form");
  actionsForm.method = "dialog";
  actionsForm.classList.add("form", "grid", "grid-cols-2", "gap-4");

  const submitButton = document.createElement("button");
  submitButton.classList.add("btn", "btn-primary");
  submitButton.textContent = "Guardar";
  submitButton.onclick = (e) => submitForm(e, day, month, year, form, modal);

  const closeButton = document.createElement("button");
  closeButton.classList.add("btn");
  closeButton.textContent = "Cerrar";
  closeButton.onclick = () => modal.close();

  actionsForm.appendChild(submitButton);
  actionsForm.appendChild(closeButton);
  modalActions.appendChild(actionsForm);

  return modalActions;
}

/**
 * @param {MouseEvent} e
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @param {HTMLFormElement} form
 * @param {HTMLDialogElement} modal
 */
function submitForm(e, day, month, year, form, modal) {
  e.preventDefault();

  const description = form.querySelector("#description").value;
  const participants = form.querySelector("#participants").value;
  const initTime = form.querySelector("#init-time").value;
  const finishTime = form.querySelector("#finish-time").value;

  if (!description || !participants || !initTime || !finishTime) {
    alert("Por favor, llene todos los campos");
    return;
  }

  if (initTime >= finishTime) {
    alert("La hora de inicio no puede ser mayor o igual a la hora de finalización");
    return;
  }

  const event = {
    day,
    month,
    year,
    description,
    participants,
    initTime,
    finishTime,
  };

  addDayEvent(event);

  modal.close();
}
