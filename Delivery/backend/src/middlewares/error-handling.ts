import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  //Errors system
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  //validation errors Zod
  if (error instanceof ZodError) {
    return response.status(400).json({
      message: "validation error",
      issues: error.format(),
    });
  }

  //Generic errors
  return response.status(500).json({ message: error.message });
}
