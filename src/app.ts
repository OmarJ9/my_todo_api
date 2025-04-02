import express from "express";
import connectDB from "./config/db";
import { env } from "./config/env";
import authRoutes from "./api/authentication";
import { taskRoutes } from "./api/tasks";
import cookieParser from "cookie-parser";
import meRoutes from "./api/me/me.routes";
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/me", meRoutes);
connectDB();

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`);
});
