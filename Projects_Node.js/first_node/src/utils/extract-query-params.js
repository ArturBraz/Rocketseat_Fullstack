export function extractQueryParams(query) {
  //recorta pulando uma char que seria o '?', separa onde tem '&' e retorna um objeto com chave e valor dos parametros.
  return query
    .slice(1)
    .split("&")
    .reduce((queryParams, params) => {
      const [key, value] = params.split("=");

      queryParams[key] = value;

      console.log(queryParams)
      return  queryParams ;
    }, {});
}
