import { Response, NextFunction } from "express";
import { verifyToken } from "../../utils/jwt";
import { env } from "../../config/env";
import { AuthRequest, ITokenPayload } from "../../types/auth.types";
import { TokenError } from "../../utils/errors";

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new TokenError("No token provided");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new TokenError("No token provided");
    }

    const decoded = verifyToken<ITokenPayload>(
      token,
      env.jwt.accessTokenSecret!
    );
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof TokenError) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  }
};
