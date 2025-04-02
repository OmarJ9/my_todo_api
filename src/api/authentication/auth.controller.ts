import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { handleError } from "../../utils/errors";
import { ILoginData, IRegisterData } from "../../types/auth.types";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (
    req: Request<{}, {}, IRegisterData>,
    res: Response
  ): Promise<void> => {
    try {
      const response = await this.authService.register(req.body);
      res.status(201).json(response);
    } catch (error) {
      const { statusCode, message } = handleError(error as Error);
      console.log(message);
      console.log(statusCode);
      res.status(statusCode).json({ message });
    }
  };

  login = async (
    req: Request<{}, {}, ILoginData>,
    res: Response
  ): Promise<void> => {
    try {
      const response = await this.authService.login(req.body);
      res.status(200).json(response);
    } catch (error) {
      const { statusCode, message } = handleError(error as Error);
      res.status(statusCode).json({ message });
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1];
      if (!accessToken) {
        res.status(401).json({ message: "No access token provided" });
        return;
      }

      await this.authService.logout(accessToken);
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      const { statusCode, message } = handleError(error as Error);
      console.log(message);
      res.status(statusCode).json({ message });
    }
  };
}
