import User from "./user.model";
import { generateAccessToken, verifyToken } from "../../utils/jwt";
import { env } from "../../config/env";
import {
  IRegisterData,
  ILoginData,
  IAuthResponse,
  ITokenPayload,
  IUser,
} from "../../types/auth.types";
import { AuthError, AppError, TokenError } from "../../utils/errors";
import {
  validateRegisterData,
  validateLoginData,
} from "../../utils/validation";

export interface IAuthService {
  register(data: IRegisterData): Promise<IAuthResponse>;
  login(data: ILoginData): Promise<IAuthResponse>;

  logout(token: string): Promise<void>;
}

export class AuthService implements IAuthService {
  async register(data: IRegisterData): Promise<IAuthResponse> {
    try {
      validateRegisterData(data);
      const { username, email, password } = data;

      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser) {
        throw new AppError(409, "User already exists");
      }

      const user = await User.create({ username, email, password });
      const accessToken = generateAccessToken(
        { id: user.id, email: user.email, username: user.username },
        env.jwt.accessTokenSecret!
      );

      await user.save();

      return {
        accessToken,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, "Error during registration");
    }
  }

  async login(data: ILoginData): Promise<IAuthResponse> {
    try {
      validateLoginData(data);
      const { email, password } = data;

      const user = await User.findOne({ email });
      if (!user) {
        throw new AppError(401, "Invalid credentials");
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new AppError(401, "Invalid credentials");
      }

      const accessToken = generateAccessToken(
        { id: user.id, email: user.email, username: user.username },
        env.jwt.accessTokenSecret!
      );

      return {
        accessToken,
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(500, "Error during login");
    }
  }

  async logout(token: string): Promise<void> {
    try {
      if (!token) {
        throw new TokenError("No access token provided");
      }

      const decoded = verifyToken<ITokenPayload>(
        token,
        env.jwt.accessTokenSecret!
      );
      const user = await User.findOne({
        _id: decoded.id,
      });

      if (!user) {
        throw new TokenError("Invalid access token");
      }
    } catch (error) {
      if (error instanceof TokenError) throw error;
      throw new AppError(500, "Error during logout");
    }
  }
}
