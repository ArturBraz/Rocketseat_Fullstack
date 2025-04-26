import { Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { z } from "zod";

export class ProductsController {
  /**
   * index - GET listar varios registros
   * show - GET um registro
   * create - POST criar registro
   * update - PUT atualizar um registro
   * remove - DELETE deletar um registro
   */

  index(request: Request, response: Response) {
    //products?page=1&limit=10
    const { page, limit } = request.query;
    response.send(`Pagina ${page} de ${limit}`);
  }

  create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z
        .string({ required_error: "Name is required!" })
        .trim() //remove spaces
        .min(6, { message: "Name must be 6 or more characters." }), //min 6 char
      price: z
        .number({ required_error: "Price is required!" })
        .positive({ message: "Price must be positive" })
        .gte(10), //greater than or equal 10
      //price: z.number().nullish(), //nullish permite q o campo seja nulo ou undefined
    });

    const { name, price } = bodySchema.parse(request.body);

    if (!name || !price) {
      throw new AppError("Nome e Preço do produto obrigatório!");
    }

    //Content-Type
    //response.send(`Produto ${name} $${price}`); - TXT
    response.status(201).json({ name, price, user_id: request.user_id }); //JSON
  }
}
