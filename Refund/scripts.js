//selects elem
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");
const expensesQuantity = document.querySelector("aside header p span");
const expensesTotal = document.querySelector("aside header h2");

//list elements
const expenseList = document.querySelector("ul");

//Capture event input and format value
amount.oninput = () => {
  //Regex to remove characters non-num
  let value = amount.value.replace(/\D/g, "");
  amount.value = value; //update value

  //transform value to cents
  value = Number(value) / 100;

  //update value in input
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return value;
}

form.onsubmit = (event) => {
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
  try {
    //create elem to add in list
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    //create icon
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);
    //create info expense
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");
    //create name of expense
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;
    //create category of expense
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;
    //create expense amount
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;
    //create remove icon
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "remover");

    //add name and categoryin expense-info
    expenseInfo.append(expenseName, expenseCategory);

    //add infos in item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    //add item in list
    expenseList.append(expenseItem);

    //update list totals and clear form
    updateTotals();
    formClear()
  } catch (error) {
    alert("Não foi possivel atualizar a lista de despesas.");
    console.log(error);
  }
}

function updateTotals() {
  try {
    //recover all items from list
    const items = expenseList.children;
    expensesQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;

    let total = 0;

    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");
      //remove char non-num and replace "," to "."
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");
      value = parseFloat(value);
      //verify if is a valid value
      if (isNaN(value)) {
        return alert("O valor não é um numero");
      }
      total += Number(value);
    }

    //create span for Symbol BRL
    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    //format value and remove 'R$'to be added in small tag styled
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    //clean content of elem
    expensesTotal.innerHTML = "";

    expensesTotal.append(symbolBRL, total);
  } catch (error) {
    console.log(error);
    alert("Não foi possivel atualizar os totais");
  }
}
//event for remove item
expenseList.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-icon")) {
    const item = e.target.closest(".expense")
    item.remove()
  }
  updateTotals()
});

function formClear(){
  expense.value = ""
  category.value = ""
  amount.value = ""

  //put focus on input for new insert
  expense.focus()
}