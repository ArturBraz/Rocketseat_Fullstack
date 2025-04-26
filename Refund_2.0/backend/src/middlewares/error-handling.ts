import { AppError } from "@/utils/AppError";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandling: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  //Error App
  if (error instanceof AppError) {
    response.status(error.statusCode).json({ message: error.message });
    return;
  }

  //Error validation(Zod)
  if (error instanceof ZodError) {
    response
      .status(400)
      .json({ message: "Validation error!", issues: error.format() });
      return
  }

  response.status(500).json({message: error.message})
  return
};
