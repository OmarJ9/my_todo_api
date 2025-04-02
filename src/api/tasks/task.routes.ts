import { Router } from "express";
import { TaskController } from "./task.controller";
import { authenticate } from "../authentication/auth.middleware";

const router = Router();
const taskController = new TaskController();

router.use(authenticate);

router.post("/", taskController.createTask);
router.get("/", taskController.getTasksByDate);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
