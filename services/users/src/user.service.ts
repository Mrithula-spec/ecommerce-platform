import * as repo from "./user.repository";
import bcrypt from "bcrypt";
import { BadRequestError, NotFoundError } from "@shared-types/errors";

const SALT_ROUNDS = 10;


export async function registerUser(email: string,  password: string,name?: string) {
  const existing = await repo.findUserByEmail(email);

  if (existing) {
    throw new BadRequestError("User already exists");
  }

   const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  return repo.createUser(email,hashedPassword, name);
}

export async function getUserById(id: string) {
  const user = await repo.findUserById(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
}
