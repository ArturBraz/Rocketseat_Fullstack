import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  role: string;
  sub: string;
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT token not found", 401);
    }

    //ex.:Bearer 411884rfvd1v784wq9744g8hg213
    const [, token] = authHeader.split(" "); //return [Bearer, 411884rfvd1v784wq9744g8hg213]

    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload;

    req.user = {
      id: user_id,
      role,
    };

    return next();
  } catch (error) {
    throw new AppError("invalid JWT Token", 401);
  }
}

export { ensureAuthenticated };
