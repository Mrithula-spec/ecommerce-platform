import jwt from "jsonwebtoken";

export function generateJWT(userId: string, role: string) {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
}
