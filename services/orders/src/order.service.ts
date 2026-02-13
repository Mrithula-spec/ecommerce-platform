import { prisma } from "@db/prisma";
import { BadRequestError, NotFoundError } from "@shared-types/errors";
import * as repo from "./order.repository";

export async function createOrder(
  userId: string,
  items: { productId: string; quantity: number }[]
) {
  // 1️⃣ Check user exists
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new NotFoundError("User not found");
  }

  // 2️⃣ Fetch products
  const productIds = items.map(i => i.productId);

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } }
  });

  if (products.length !== productIds.length) {
    throw new BadRequestError("One or more products not found");
  }

  // 3️⃣ Calculate prices
  let totalAmount = 0;

  const orderItems = items.map(item => {
    const product = products.find(p => p.id === item.productId)!;
    const price = product.price * item.quantity;
    totalAmount += price;

    return {
      productId: item.productId,
      quantity: item.quantity,
      price: product.price
    };
  });

  // 4️⃣ Create order + items
  return repo.createOrderWithItems(userId, totalAmount, orderItems);
}
export async function getUserOrders(userId: string) {
  return repo.getOrdersByUser(userId);
}

export async function getOrderById(orderId: string, userId: string) {
  const order = await repo.getOrderById(orderId, userId);

  if (!order) {
    throw new NotFoundError("Order not found");
  }

  return order;
}

