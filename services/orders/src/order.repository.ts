import { prisma } from "@db/prisma";

export function createOrderWithItems(
  userId: string,
  totalAmount: number,
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[]
) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId,
        totalAmount,
        status: "CREATED"
      }
    });

    await tx.orderItem.createMany({
      data: items.map(item => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }))
    });

    return order;
  });
}
export function getOrdersByUser(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });
}

export function getOrderById(orderId: string, userId: string) {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      userId: userId
    },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });
}

