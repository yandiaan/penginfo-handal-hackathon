import { z } from 'zod';

// ── Base ──────────────────────────────────────────────────────────────────────

export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  createdAt: z.date().or(z.string().datetime()),
  updatedAt: z.date().or(z.string().datetime()),
});

export type User = z.infer<typeof userSchema>;

// ── Create ────────────────────────────────────────────────────────────────────

export const createUserSchema = userSchema.pick({ name: true, email: true });

export type CreateUserInput = z.infer<typeof createUserSchema>;

// ── Update ────────────────────────────────────────────────────────────────────

export const updateUserSchema = createUserSchema.partial();

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

// ── Response ──────────────────────────────────────────────────────────────────

export const userResponseSchema = userSchema.omit({});

export type UserResponse = z.infer<typeof userResponseSchema>;
