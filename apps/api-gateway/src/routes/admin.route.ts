import { Router, type Router as ExpressRouter } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { requireAdmin } from "../middleware/admin.middleware";
import { prisma } from "../db/prisma";
import { OrderStatus } from "@prisma/client";
import { upload } from "../middleware/upload.middleware";


const router: ExpressRouter = Router();

/* PROTECT ALL ADMIN ROUTES */
router.use(requireAuth);
router.use(requireAdmin);

/* PRODUCTS */
router.get("/products", async (_, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

router.post(
  "/products",
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, price, stock } = req.body;

      const imageUrl = req.file
        ? `/uploads/${req.file.filename}`
        : null;

      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: Number(price),
          stock: Number(stock),
          imageUrl,
        },
      });

      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create product" });
    }
  }
);


router.put(
  "/products/:id",
  upload.single("image"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, stock } = req.body;

      const imageUrl = req.file
        ? `/uploads/${req.file.filename}`
        : undefined;

      const updated = await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          price: Number(price),
          stock: Number(stock),
          ...(imageUrl && { imageUrl }),
        },
      });

      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Update failed" });
    }
  }
);


/* ORDERS */
router.get("/orders", async (_, res) => {
  const orders = await prisma.order.findMany({
    include: { user: true },
  });
  res.json(orders);
});

router.patch("/orders/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !Object.values(OrderStatus).includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ✅ Strict lifecycle transitions
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      CREATED: ["PROCESSING", "CANCELLED"],
      PROCESSING: ["SHIPPED", "CANCELLED"],
      SHIPPED: ["DELIVERED"],
      DELIVERED: [],
      PAID: ["PROCESSING"],
      CANCELLED: [],
      RETURNED: [],
      REFUNDED: [],
    };

    if (!validTransitions[order.status].includes(status)) {
      return res.status(400).json({
        message: `Cannot change status from ${order.status} to ${status}`,
      });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update order status" });
  }
});


/* USERS */
router.get("/users", async (_, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true },
  });
  res.json(users);
});

/* STATS */
router.get("/stats", async (_req, res) => {
  try {
    const [products, orders, users] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.user.count(),
    ]);

    // Only include this if your Order model has status field
    const pendingOrders = await prisma.order.count({
      where: { status: OrderStatus.CREATED },
    });

    res.json({
      products,
      orders,
      users,
      pendingOrders,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load stats" });
  }
});
router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

     // First delete related order items
    await prisma.orderItem.deleteMany({
      where: { productId: id },
    });

    // Delete product
    await prisma.product.delete({
      where: { id },
    });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete product" });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});




export default router;
