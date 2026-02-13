import type { Router as ExpressRouter, Request, Response, NextFunction } from "express";
import { Router } from "express";
import { createUserSchema } from "@services/users";
import { registerUser, getUserById } from "@services/users";

export const usersRouter: ExpressRouter = Router();
usersRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = createUserSchema.parse(req.body);
    const user = await registerUser(parsed.email,parsed.password, parsed.name);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

