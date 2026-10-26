import { db } from "../db.js";
import { AppError } from "../errors.js";
import type { Task, TaskStatus } from "../types.js";

export interface TaskFilter {
  project?: string;
  status?: TaskStatus;
}

export function listTasks(filter: TaskFilter = {}): Task[] {
  return db
    .all()
    .filter((t) => (filter.project ? t.project === filter.project : true))
    .filter((t) => (filter.status ? t.status === filter.status : true));
}

export function getTask(id: string): Task {
  const task = db.find(id);
  if (!task) throw AppError.notFound(`Tâche ${id}`);
  return task;
}

export function createTask(input: {
  title: string;
  project: string;
  dueDate?: string | null;
}): Task {
  const title = input.title.trim();
  if (title.length === 0) throw AppError.badRequest("Le titre est obligatoire");
  return db.insert({
    title,
    project: input.project,
    status: "todo",
    dueDate: input.dueDate ?? null,
  });
}

export function deleteTask(id: string): void {
  if (!db.remove(id)) throw AppError.notFound(`Tâche ${id}`);
}

/** Taux de complétion d'une liste de tâches, entre 0 et 1 (0 si liste vide) */
export function completionRate(tasks: Task[]): number {
  if (tasks.length === 0) return 0;
  const done = tasks.filter((t) => t.status === "done").length;
  return done / tasks.length;
}
