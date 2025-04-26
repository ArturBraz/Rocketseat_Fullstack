export function formatCurrency(value: number) {
  const formatedCurrency = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return formatedCurrency.format(value).replace("R$","");
}
