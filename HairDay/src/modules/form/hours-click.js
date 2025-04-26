export function hoursClick() {
  const hours = document.querySelectorAll(".hour-available");
  hours.forEach((available) => {
    available.addEventListener("click", (selected) => {
      //Removendo a classe 'hour-selected' de todas 'li' não selecionadas
      hours.forEach((hour) => {
        hour.classList.remove("hour-selected");
      });

      //add a classe na 'li' selecionada
      selected.target.classList.add("hour-selected")
    });
  });
}
