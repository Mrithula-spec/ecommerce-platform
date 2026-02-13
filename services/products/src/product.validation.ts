import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().int().positive("Price must be greater than 0"),
  stock: z.coerce.number()
});
