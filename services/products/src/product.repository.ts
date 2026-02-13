import { prisma } from "@db/prisma";

export function createProduct(
  name: string,
  description: string | undefined,
  price: number,
  stock: number,
  imageUrl?: string
) {
  return prisma.product.create({
    data: {
      name,
      description: description ?? null,
      price,
      stock,
      imageUrl: imageUrl ?? null
    }
  });
}

export function listProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id }
  });
}
