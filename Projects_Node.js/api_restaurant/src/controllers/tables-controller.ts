import { AppError } from "@/utils/AppError";
import { knex } from "@/database/knex";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

class TablesController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const tables = await knex<TableRepository>("tables")
        .select()
        .orderBy("table_number");
      return response.json(tables);
    } catch (error) {
      next(error);
    }
  }

  // async index(request:Request,response:Response,next:NextFunction){
  //   try {

  //   } catch (error) {
  //     next(error)
  //   }
  // }
}

export { TablesController };
