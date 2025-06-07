import { z } from 'zod'

export const ForgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email({
      message: 'Invalid email address'
    })
})

export type TypeForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>
