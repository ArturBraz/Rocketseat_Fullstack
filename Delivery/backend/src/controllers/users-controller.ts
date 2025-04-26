import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";
import { hash } from "bcrypt";
import { z } from "zod";

class UsersController {
  //create
  async create(request: Request, response: Response, next: NextFunction) {
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(request.body);

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });
    if (userWithSameEmail) {
      throw new AppError("User with same email already exist.");
    }

    const hashedPassword = await hash(password, 8); //(<data>,<salt>)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    //separates the 'password' from the rest of the data for response
    const {password:_,...userWithoutPassword} = user 

    return response.status(201).json(userWithoutPassword);
  }
  //list
  async list(request: Request, response: Response, next: NextFunction) {
    return response.status(201).json({ message: "ok" });
  }
}

export { UsersController };
