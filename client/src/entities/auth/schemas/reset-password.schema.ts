import { z } from 'zod'

export const ResetPasswordSchema = z.object({
  token: z.string(),
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

export type TypeResetPasswordSchema = z.infer<typeof ResetPasswordSchema>
