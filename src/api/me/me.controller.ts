import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../types/auth.types";
import { MeService } from "./me.service";
import { handleError } from "../../utils/errors";

type AsyncRequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => Promise<any>;

export class MeController {
  private meService: MeService;

  constructor() {
    this.meService = new MeService();
  }

  getMe: AsyncRequestHandler = async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await this.meService.getMe(userId);
      res.json(user);
    } catch (error) {
      const { statusCode, message } = handleError(error as Error);
      res.status(statusCode).json({ message });
    }
  };

  updateMe: AsyncRequestHandler = async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await this.meService.updateMe(userId, req.body);
      res.json(user);
    } catch (error) {
      const { statusCode, message } = handleError(error as Error);
      res.status(statusCode).json({ message });
    }
  };
}

export default new MeController();
