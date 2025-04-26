import dayjs from "dayjs";

import { scheduleNew } from "../../services/schedule-new.js";
import { schedulesDay } from "../schedules/load.js";

const form = document.querySelector("form");
const selectedDate = document.getElementById("date");
const clientName = document.getElementById("client");

//Data atual para o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

//Carrega data atual e Define data minima
selectedDate.value = inputToday;
selectedDate.min = inputToday;

form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    // Recupera nome do cliente
    const name = clientName.value.trim();

    if (!name) {
      return alert("Informe o nome do cliente");
    }

    // Recupera o horario selcionado
    const hourSelected = document.querySelector(".hour-selected");
    if (!hourSelected) {
      return alert("Selecione um horario!");
    }

    const [hour] = hourSelected.innerText.split(":");

    //insere hora na data
    const when = dayjs(selectedDate.value).add(hour, "hour");

    // Gera ID
    const id = new Date().getTime();

    // Faz o agendamento
    await scheduleNew({
      id,
      name,
      when,
    });
    // Recarrega os agendamentos
    await schedulesDay();

    // Limpa o input
    clientName.value = "";
    
  } catch (error) {
    alert("Não foi possivel realizar o agendamento!");
  }
};
