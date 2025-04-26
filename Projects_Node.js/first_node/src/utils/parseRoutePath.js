export function parseRoutePath(path) {
  //RegEx para pegar o ':' + sequencia de caracteres.Parametro não nomeado.
  const routeParametersRegex = /:([a-zA-Z]+)/g;

  //verifica o padrão da 'routeParametersRegex' e substitui pelo primeiro grupo da captura da Regex que deve conter parametros são compostos por letras minúsculas, números, hífens e sublinhados.
  const params = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9-_]+)");

  //pathRegex passa a ser um novo objeto a partir da string 'params' e .
  const pathRegex = new RegExp(`${params}(?<query>\\?(.*))?$`);
  /*
    RegExp() gera um novo objeto que pode realizar operações test(), exec(), replace().
   */

  return pathRegex;
}
