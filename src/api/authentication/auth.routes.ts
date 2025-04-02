import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authenticate } from "./auth.middleware";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.delete("/logout", authController.logout);

export default router;
