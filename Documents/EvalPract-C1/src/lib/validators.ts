import { z } from "zod";

export const mostBorrowedSchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(20).default(5),
});