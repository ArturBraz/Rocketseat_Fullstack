//currency quote of the day
const quotes = {
    USD: 5.25, //Dollar
    EUR: 5.7, //Euro
    JPY: 0.038, //Yen Japão
    GBP: 6.3, //Libra
    BRL: 1.0, //Real
    KRW: 0.004, // Won Sul-Coreano
};

//select elements html
const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const currency = document.querySelector("#currency");
const footer = document.querySelector("main footer");
const description = document.querySelector("#description");
const result = document.querySelector("#result");

amount.addEventListener("input", () => {
    const hasCharRegex = /\D+/g;
    amount.value = amount.value.replace(hasCharRegex, "");
});

form.onsubmit = (e) => {
    e.preventDefault();

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, quotes.USD, "US$");
            break;
        case "EUR":
            convertCurrency(amount.value, quotes.EUR, "€");
            break;
        case "GBP":
            convertCurrency(amount.value, quotes.GBP, "£");
            break;

        default:
            convertCurrency(amount.value, quotes.BRL, "R$");
            break;
    }
};

//function to convert currency
function convertCurrency(amount, price, symbol) {
    try {
        //description convert
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

        //calculate value
        let total = amount * price;
        //format value
        total = formatCurrencyBRL(total).replace("R$","")

        //insert total value
        result.textContent = `${total} Reais`

        //show result
        footer.classList.add("show-result");
    } catch (error) {
        footer.classList.remove("show-result");

        console.log(error);
        alert("Não foi possivel realizar a conversão");
    }
}

function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}
