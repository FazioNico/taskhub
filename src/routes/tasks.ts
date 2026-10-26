import { Router } from "express";
import { z } from "zod";
import { createTask, deleteTask, getTask, listTasks } from "../services/taskService.js";

const statusSchema = z.enum(["todo", "in_progress", "done"]);

const listQuerySchema = z.object({
  project: z.string().min(1).optional(),
  status: statusSchema.optional(),
});

const createBodySchema = z.object({
  title: z.string().min(1).max(200),
  project: z.string().min(1),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format attendu : YYYY-MM-DD")
    .nullable()
    .optional(),
});

export const tasksRouter = Router();

// GET /tasks?project=&status=
tasksRouter.get("/", (req, res) => {
  const filter = listQuerySchema.parse(req.query);
  res.json(listTasks(filter));
});

// GET /tasks/:id
tasksRouter.get("/:id", (req, res) => {
  res.json(getTask(req.params.id));
});

// POST /tasks
tasksRouter.post("/", (req, res) => {
  const body = createBodySchema.parse(req.body);
  res.status(201).json(createTask(body));
});

// DELETE /tasks/:id
tasksRouter.delete("/:id", (req, res) => {
  deleteTask(req.params.id);
  res.status(204).end();
});
