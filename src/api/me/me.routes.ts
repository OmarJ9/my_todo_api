import { Router } from "express";
import { authenticate } from "../authentication/auth.middleware";
import MeController from "./me.controller";

const router = Router();

router.get("/", authenticate, MeController.getMe);
router.put("/", authenticate, MeController.updateMe);

export default router;
