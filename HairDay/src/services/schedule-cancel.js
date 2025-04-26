import { apiConfig } from "./api-config";

export async function scheduleCancel({ id }) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Erro ao cancelar agendamento: ${response.statusText}`);
    }

    alert("Agendamento cancelado com sucesso!");
  } catch (error) {
    console.log(error);
    alert("Não foi possivel cancelar o agendamento!");
  }
}
