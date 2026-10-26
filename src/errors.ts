import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code: string = "APP_ERROR",
  ) {
    super(message);
    this.name = "AppError";
  }

  static notFound(what: string): AppError {
    return new AppError(404, `${what} introuvable`, "NOT_FOUND");
  }

  static badRequest(message: string): AppError {
    return new AppError(400, message, "BAD_REQUEST");
  }
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    res.status(err.status).json({ error: { code: err.code, message: err.message } });
    return;
  }
  if (err instanceof ZodError) {
    res.status(400).json({
      error: { code: "VALIDATION_ERROR", message: "Requête invalide", details: err.issues },
    });
    return;
  }
  console.error(err);
  res.status(500).json({ error: { code: "INTERNAL", message: "Erreur interne" } });
};
