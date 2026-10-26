import type { Task } from "./types.js";

/**
 * Stockage en mémoire.
 * Volontairement simple : pas de base de données à installer pendant le cours.
 */
let tasks: Task[] = [];
let nextId = 1;

export const db = {
  all(): Task[] {
    return [...tasks];
  },
  find(id: string): Task | undefined {
    return tasks.find((t) => t.id === id);
  },
  insert(data: Omit<Task, "id" | "createdAt">): Task {
    const task: Task = { ...data, id: String(nextId++), createdAt: new Date().toISOString() };
    tasks.push(task);
    return task;
  },
  update(id: string, patch: Partial<Omit<Task, "id" | "createdAt">>): Task | undefined {
    const task = tasks.find((t) => t.id === id);
    if (!task) return undefined;
    Object.assign(task, patch);
    return task;
  },
  remove(id: string): boolean {
    const before = tasks.length;
    tasks = tasks.filter((t) => t.id !== id);
    return tasks.length < before;
  },
  /** Réinitialise le stockage (tests et seed) */
  reset(seed: Omit<Task, "id" | "createdAt">[] = []): void {
    tasks = [];
    nextId = 1;
    seed.forEach((t) => db.insert(t));
  },
};
