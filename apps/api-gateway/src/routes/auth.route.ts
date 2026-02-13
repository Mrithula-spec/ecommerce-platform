import type { Router as ExpressRouter } from "express";
import { Router } from "express";
import { login } from "@services/auth";
import { generateJWT } from "../services/auth";
import {
  forgotPassword,
  resetPassword,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@services/auth";

import { requireAuth } from "../middleware/auth.middleware";
import { prisma } from "../db/prisma";
import { loginSchema } from "@services/auth";

export const authRouter: ExpressRouter = Router();

authRouter.post("/login", async (req, res, next) => {
  try {
    const parsed = loginSchema.parse(req.body);
    const result = await login(parsed.email, parsed.password, parsed.loginType);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

authRouter.post("/forgot-password", async (req, res, next) => {
  try {
    const parsed = forgotPasswordSchema.parse(req.body);
    const result = await forgotPassword(parsed.email);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

authRouter.post("/reset-password", async (req, res, next) => {
  try {
    const parsed = resetPasswordSchema.parse(req.body);
    const result = await resetPassword(parsed.token, parsed.password);
    res.json(result);
  } catch (err) {
    next(err);
  }
});


authRouter.get("/me", requireAuth, async (req, res, next) => {
  try {
    const userId = req.user!.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true },
    });

    res.json(user);
  } catch (err) {
    next(err);
  }
});

authRouter.post("/oauth", async (req, res, next) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          role: "USER",
        },
      });
    }

    const token = generateJWT(user.id, user.role);

    res.json({
      token,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
});
