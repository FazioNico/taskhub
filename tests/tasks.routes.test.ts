import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { db } from "../src/db.js";
import { seedTasks } from "../src/seed.js";

const app = createApp();

beforeEach(() => db.reset(seedTasks));

describe("GET /tasks", () => {
  it("retourne toutes les tâches", async () => {
    const res = await request(app).get("/tasks");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(seedTasks.length);
  });

  it("filtre par projet", async () => {
    const res = await request(app).get("/tasks?project=mobile");
    expect(res.body).toHaveLength(3);
    expect(res.body.every((t: { project: string }) => t.project === "mobile")).toBe(true);
  });

  it("rejette un statut inconnu", async () => {
    const res = await request(app).get("/tasks?status=archived");
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe("VALIDATION_ERROR");
  });
});

describe("GET /tasks/:id", () => {
  it("retourne la tâche", async () => {
    const res = await request(app).get("/tasks/1");
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Maquette page d'accueil");
  });

  it("retourne 404 si la tâche n'existe pas", async () => {
    const res = await request(app).get("/tasks/999");
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe("NOT_FOUND");
  });
});

describe("POST /tasks", () => {
  it("crée une tâche avec le statut todo", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Nouvelle tâche", project: "mobile", dueDate: "2026-12-01" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      title: "Nouvelle tâche",
      status: "todo",
      dueDate: "2026-12-01",
    });
  });

  it("rejette une date mal formée", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "X", project: "mobile", dueDate: "01.12.2026" });
    expect(res.status).toBe(400);
  });
});

describe("DELETE /tasks/:id", () => {
  it("supprime la tâche", async () => {
    await request(app).delete("/tasks/1").expect(204);
    await request(app).get("/tasks/1").expect(404);
  });
});
