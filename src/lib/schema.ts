import { z } from "zod"

export const LoginAuthSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
    hospitalId: z.string().optional(),
    userCategoryId: z.string().optional(),
  })


