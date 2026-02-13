import {
  Router,
  type Router as ExpressRouter,
  type Request,
  type Response,
  type NextFunction
} from "express";

import {
  createProduct,
  getProductById,
  listProducts
} from "@services/products";

import { prisma } from "../db/prisma";

import { upload } from "../middleware/upload.middleware";


export const productsRouter: ExpressRouter = Router();

// CREATE PRODUCT
productsRouter.post(
  "/",
  upload.single("image"),   // MUST be here
  async (req, res, next) => {
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

      res.status(201).json(product);
    } catch (err) {
      console.error(err);   // 🔴 add this temporarily
      next(err);
    }
  }
);



// LIST PRODUCTS
productsRouter.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await listProducts();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }
);

// GET PRODUCT BY ID
productsRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
         const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Product id is required" });
      }
      const product = await getProductById(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);
