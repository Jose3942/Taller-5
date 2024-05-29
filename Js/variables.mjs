import { loadDaysWithEvents } from "./logicManager.mjs";

/** @type {Array<{ day: number, month: number, year: number, description: string, participants: string, initTime: string, finishTime: string }>} */
export const daysWithEvents = loadDaysWithEvents();
export const months = [
  { id: "january", name: "Enero" },
  { id: "february", name: "Febrero" },
  { id: "march", name: "Marzo" },
  { id: "april", name: "Abril" },
  { id: "may", name: "Mayo" },
  { id: "june", name: "Junio" },
  { id: "july", name: "Julio" },
  { id: "august", name: "Agosto" },
  { id: "september", name: "Septiembre" },
  { id: "october", name: "Octubre" },
  { id: "november", name: "Noviembre" },
  { id: "december", name: "Diciembre" },
];

export const days = [
  { id: "sunday", name: "Domingo", shortName: "D" },
  { id: "monday", name: "Lunes", shortName: "L" },
  { id: "tuesday", name: "Martes", shortName: "M" },
  { id: "wednesday", name: "Miércoles", shortName: "X" },
  { id: "thursday", name: "Jueves", shortName: "J" },
  { id: "friday", name: "Viernes", shortName: "V" },
  { id: "saturday", name: "Sábado", shortName: "S" },
];
