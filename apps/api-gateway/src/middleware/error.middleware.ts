import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import type { ZodIssue } from "zod";
import { AppError } from "@shared-types/errors";

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // 1️⃣ Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation failed",
      details: err.issues.map((issue: ZodIssue) => ({
        field: issue.path.join("."),
        message: issue.message
      }))
    });
  }

  // 2️⃣ Domain errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }

  // 3️⃣ Unknown errors
  console.error(err);
  return res.status(500).json({
    error: "Internal Server Error"
  });
}
