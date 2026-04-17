import { z } from "zod";

export const mostBorrowedSchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(20).default(5),
});

export const overdueLoansSchema = z.object({
  min_days: z.coerce.number().int().min(0).default(0),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(20).default(5),
});

export const finesSummarySchema = z.object({
  date_from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
  date_to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
});