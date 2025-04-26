import {schedulesDay} from "../schedules/load";

const selectedDate = document.getElementById("date");

// Recarrega a lista de horarios quando o input mudar
selectedDate.onchange = () => schedulesDay()
