import { z } from 'zod'

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email({
      message: 'Invalid email address'
    }),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(8, {
      message: 'Password must be at least 8 characters'
    })
    .max(32, {
      message: 'Password must be at most 32 characters'
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/, {
      message: 'Password must include upper case, lower case, number, and special character'
    })
})

export type TypeLoginSchema = z.infer<typeof LoginSchema>
