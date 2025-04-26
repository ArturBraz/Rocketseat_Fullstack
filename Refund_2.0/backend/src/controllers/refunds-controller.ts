import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Category } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";

const CategoriesEnum = z.enum([
  "food",
  "others",
  "services",
  "transport",
  "accommodation",
]);

class RefundsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(1, { message: "Informe o nome da solicitação" }),
      category: CategoriesEnum,
      amount: z.number().positive({ message: "O valor precisa ser positivo." }),
      filename: z.string().min(20),
    });

    const { name, category, amount, filename } = bodySchema.parse(req.body);

    if (!req.user?.id) {
      throw new AppError("Unauthorized", 401);
    }

    const refund = await prisma.refunds.create({
      data: {
        name,
        category,
        amount,
        filename,
        userId: req.user.id,
      },
    });

    res.status(201).json(refund);
  }

  async index(req: Request, res: Response) {
    const querySchema = z.object({
      name: z.string().optional().default(""),
      page: z.coerce.number().optional().default(1),
      perPage: z.coerce.number().optional().default(10), //Qtd de registros
    });

    const { name, page, perPage } = querySchema.parse(req.query);

    //Calc valores de 'skip'(Qtd de registros para pular)
    const skip = (page - 1) * perPage;

    const refunds = await prisma.refunds.findMany({
      skip,
      take: perPage,
      where: {
        user: {
          name: {
            contains: name.trim(),
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    //Obtem o total de registros para calc n° de paginas
    const totalRecord = await prisma.refunds.count({
      where: {
        user: {
          name: {
            contains: name.trim(),
          },
        },
      },
    });

    const totalPages = Math.ceil(totalRecord / perPage);

    res.json({
      refunds,
      pagination: {
        page,
        perPage,
        totalRecord,
        totalPages: totalPages > 0 ? totalPages : 1,
      },
    });
  }

  async show(req: Request, res: Response){
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const {id} = paramsSchema.parse(req.params)

    const refund = await prisma.refunds.findFirst({
      where: {id},
      include: {user: true}
    })

    res.json(refund)
  }
}


export { RefundsController };
