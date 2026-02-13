import * as repo from "./product.repository";
import { NotFoundError } from "@shared-types/errors";

export async function createProduct(
  name: string,
  description: string | undefined,
  price: number,
  stock: number,
  imageUrl?: string
) {
  return repo.createProduct(name, description, price,stock,imageUrl);
}

export async function getProductById(id: string) {
  const product = await repo.getProductById(id);

  if (!product) {
    throw new NotFoundError("Product not found");
  }

  return product;
}

export async function listProducts() {
  return repo.listProducts();
}
