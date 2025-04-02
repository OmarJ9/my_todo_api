import jwt from "jsonwebtoken";
import { ITokenPayload } from "../types/auth.types";

const ACCESS_TOKEN_EXPIRY = "30d";

export const generateAccessToken = (
  payload: ITokenPayload,
  secret: string
): string => {
  return jwt.sign(payload, secret, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

export const verifyToken = <T>(token: string, secret: string): T => {
  try {
    return jwt.verify(token, secret) as T;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token expired");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    }
    throw error;
  }
};
