import mongoose from "mongoose";
import Task from "./task.model";

export class TaskService {
  async createTask(
    userId: string,
    taskData: {
      title: string;
      note?: string;
      date: string;
      time: string;
      colorindex?: number;
    }
  ) {
    const { title, note, date, time, colorindex } = taskData;
    taskData;

    if (!title || !date || !time) {
      throw new Error("Please provide all required fields");
    }

    const task = await Task.create({
      userId,
      title,
      note,
      date,
      time,
      colorindex,
    });

    return task;
  }

  async getTasksByDate(userId: string, date: string) {
    const tasks = await Task.find({ userId, date }).sort({ createdAt: -1 });
    return tasks;
  }

  async updateTask(userId: string, taskId: string, updates: any) {
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw new Error("Invalid task ID");
    }

    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      { ...updates },
      { new: true }
    );

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }

  async deleteTask(userId: string, taskId: string) {
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw new Error("Invalid task ID");
    }

    const task = await Task.findOneAndDelete({ _id: taskId, userId });

    if (!task) {
      throw new Error("Task not found");
    }

    return { message: "Task deleted successfully" };
  }
}
