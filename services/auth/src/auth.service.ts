import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { prisma } from "@db/prisma";
import { NotFoundError, BadRequestError } from "@shared-types/errors";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "7d";
const SALT_ROUNDS = 10;

/* =========================================================
   LOGIN
========================================================= */

export async function login(
  email: string,
  password: string,
  loginType: "USER" | "ADMIN"
) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  if (!user.password) {
    throw new BadRequestError("OAuth account cannot login with password");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new BadRequestError("Invalid credentials");
  }

  // 🔐 STRICT ROLE ENFORCEMENT
  if (user.role !== loginType) {
    throw new BadRequestError("Unauthorized access for this login type");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
}
 

/* =========================================================
   FORGOT PASSWORD
========================================================= */

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Prevent email enumeration
  if (!user) {
    return {
      message: "If the email exists, a reset link has been sent.",
    };
  }

  // If OAuth user (no password set)
  if (!user.password) {
    return {
      message: "Password reset not available for OAuth accounts.",
    };
  }

  // Generate secure random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash token before storing in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: expires,
    },
  });

  // For now we log link (replace with email provider later)
  const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

  console.log("====================================");
  console.log("PASSWORD RESET LINK:");
  console.log(resetUrl);
  console.log("====================================");

  return {
    message: "If the email exists, a reset link has been sent.",
  };
}

/* =========================================================
   RESET PASSWORD
========================================================= */

export async function resetPassword(token: string, newPassword: string) {
  // Hash incoming token
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: hashedToken,
      resetPasswordExpires: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    throw new BadRequestError("Token invalid or expired");
  }

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });

  return {
    message: "Password reset successful",
  };
}
