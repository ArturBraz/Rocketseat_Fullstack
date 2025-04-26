import express, { Request, Response, NextFunction } from "express";
import { routes } from "./routes";
import { AppError } from "./utils/app-error";
import { ZodError } from "zod";

const PORT = 3333;

const app = express();

//define qual representação de trafego de dados será usada
app.use(express.json()); //JSON ou XML

//middleware Global,definido antes das rotas
//app.use(myMiddleware)

app.use(routes);

/*
 * 400 (Bad Request): Erro do cliente.
 * 500 (Internal Server Error): Erro de servidor.
 */
//colocar depois de todo codigo permite que capture qualquer erro lançado na pilha de execução
app.use(
  (error: any, request: Request, response: Response, _: NextFunction): void => {
    // Verifica se o erro é uma instância de AppError
    if (error instanceof AppError) {
      response.status(error.statusCode).json({ message: error.message });
      return;
    }

    if (error instanceof ZodError) {
      response
        .status(400)
        .json({ message: "Validation error!", issues: error.format() });
      return;
    }

    response.status(500).json({ message: error.message });
    return;
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on Port:${PORT}`);
});
