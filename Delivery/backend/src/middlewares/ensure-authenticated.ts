import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  role: string;
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new AppError("JWT Token not found.", 401);
    }

    const [, token] = authHeader.split(" ");

    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload;

    //merges the request interface with the 'user' data (type setted in the file 'express.d.ts')
    request.user = {
      id: user_id,
      role,
    };

    return next();
  } catch (error) {
    throw new AppError("invalid JWT Token!", 401);
  }
}

export { ensureAuthenticated };
