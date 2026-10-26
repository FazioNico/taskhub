import express from "express";
import { errorHandler } from "./errors.js";
import { tasksRouter } from "./routes/tasks.js";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });
  app.use("/tasks", tasksRouter);

  app.use(errorHandler);
  return app;
}
