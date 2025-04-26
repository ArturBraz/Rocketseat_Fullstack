import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

//roles ex.: ["manager","leader"]

function verifyUserAuthorization(role: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !role.includes(req.user.role)) {
      throw new AppError("Unauthorized", 402);
    }

    return next(); //sai do middleware e segue para o controller
  };
}

export { verifyUserAuthorization };
