import { prisma } from "@db/prisma";


export function createUser(email: string,password: string,name?: string) {
  return prisma.user.create({
    data: { email,password,name }
  });
}

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email }
  });
}

export function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id }
  });
}
