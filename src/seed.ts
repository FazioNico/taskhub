import type { Task } from "./types.js";

export const seedTasks: Omit<Task, "id" | "createdAt">[] = [
  { title: "Maquette page d'accueil", project: "site-web", status: "done", dueDate: "2026-10-10" },
  {
    title: "Intégrer le formulaire de contact",
    project: "site-web",
    status: "in_progress",
    dueDate: "2026-10-24",
  },
  { title: "Corriger le menu mobile", project: "site-web", status: "todo", dueDate: "2026-10-20" },
  { title: "Écran de connexion", project: "mobile", status: "todo", dueDate: "2026-10-30" },
  { title: "Notifications push", project: "mobile", status: "todo", dueDate: null },
  { title: "Publier sur l'App Store", project: "mobile", status: "todo", dueDate: "2026-11-15" },
];
