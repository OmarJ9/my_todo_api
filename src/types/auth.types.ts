import { Request } from "express";

export interface ITokenPayload {
  id: string;
  username: string;
  email: string;
}

export interface IAuthResponse {
  accessToken: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  avatarIndex: number;
}

export interface IUserDocument extends IUser {
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IRegisterData {
  username: string;
  email: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IUpdateUserData {
  username?: string;
  email?: string;
  avatarIndex?: number;
}

export interface AuthRequest extends Request {
  user?: ITokenPayload;
}
