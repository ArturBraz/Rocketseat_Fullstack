import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { scheduleShow } from "./show.js";
import { hoursLoad } from "../form/hours-load.js";

const selectedDate = document.getElementById("date");

export async function schedulesDay() {
  //obtem a data do input
  const date = selectedDate.value;

  // Busca na API os agendamentos
  const dailySchedules = await scheduleFetchByDay({ date });

  // REnderiza os agendamentos
  scheduleShow({ dailySchedules });

  //renderiza as horas disponiveis
  hoursLoad({ date, dailySchedules });
}
