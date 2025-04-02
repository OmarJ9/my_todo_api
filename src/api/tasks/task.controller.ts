import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../../types/auth.types";
import { TaskService } from "./task.service";

// Define a custom handler type
type AsyncRequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => Promise<any>;

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  // Create a new task
  createTask: AsyncRequestHandler = async (req, res) => {
    try {
      const { title, note, date, time, colorindex } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const task = await this.taskService.createTask(userId, {
        title,
        note,
        date,
        time,
        colorindex,
      });

      return res.status(201).json({ task });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Please provide all required fields") {
          return res.status(400).json({ message: error.message });
        }
      }
      return res.status(500).json({ message: "Server error" });
    }
  };

  // Get all tasks for a user
  getTasksByDate: AsyncRequestHandler = async (req, res) => {
    try {
      const userId = req.user?.id;
      const { date } = req.body;

      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      if (!date) {
        return res.status(400).json({ message: "Date is required" });
      }

      const tasks = await this.taskService.getTasksByDate(userId, date);
      return res.status(200).json({ tasks });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  };

  // Update a task
  updateTask: AsyncRequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const { title, note, date, time, colorindex } = req.body;
      const task = await this.taskService.updateTask(userId, id, {
        title,
        note,
        date,
        time,
        colorindex,
      });
      return res.status(200).json({ task });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Invalid task ID") {
          return res.status(400).json({ message: error.message });
        }
        if (error.message === "Task not found") {
          return res.status(404).json({ message: error.message });
        }
      }
      return res.status(500).json({ message: "Server error" });
    }
  };

  // Delete a task
  deleteTask: AsyncRequestHandler = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const result = await this.taskService.deleteTask(userId, id);
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Invalid task ID") {
          return res.status(400).json({ message: error.message });
        }
        if (error.message === "Task not found") {
          return res.status(404).json({ message: error.message });
        }
      }
      return res.status(500).json({ message: "Server error" });
    }
  };
}
