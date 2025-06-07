import { z } from 'zod'

export const RegisterSchema = z
  .object({
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
      }),
    confirmPassword: z
      .string({
        required_error: 'Confirm password is required'
      })
      .min(8, {
        message: 'Confirm password must be at least 8 characters'
      })
      .max(32, {
        message: 'Confirm password must be at most 32 characters'
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/, {
        message: 'Password must include upper case, lower case, number, and special character'
      })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export type TypeRegisterSchema = z.infer<typeof RegisterSchema>
