import { z } from 'zod';

// ── Pagination ────────────────────────────────────────────────────────────────

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type PaginationInput = z.infer<typeof paginationSchema>;

// ── ID param ──────────────────────────────────────────────────────────────────

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type IdParam = z.infer<typeof idParamSchema>;

// ── Sort ──────────────────────────────────────────────────────────────────────

export const sortOrderSchema = z.enum(['asc', 'desc']).default('asc');

export type SortOrder = z.infer<typeof sortOrderSchema>;
