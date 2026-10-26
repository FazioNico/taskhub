export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  project: string;
  status: TaskStatus;
  /** Date d'échéance au format ISO (YYYY-MM-DD), ou null si aucune */
  dueDate: string | null;
  createdAt: string;
}
