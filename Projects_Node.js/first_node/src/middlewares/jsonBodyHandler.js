export async function jsonBodyHandler(request, response) {
  //Array com cada chunk
  const buffers = [];

  //coleta os chunks e atribui ao array 'buffers'
  for await (const chunk of request) {
    buffers.push(chunk);
  }

  try {
    //concat os chunks e converte para string. em seguida converte string para json
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    request.body = null;
  }

  //Define header de resposta para JSON
  response.setHeader("Content-Type", "application/json");
}
