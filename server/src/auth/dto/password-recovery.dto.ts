import { IsEmail, IsString, IsUUID } from 'class-validator'

export class ForgotPasswordDto {
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email is not valid' })
  email: string
}

export class ResetPasswordDto {
  @IsString({ message: 'Token must be a string' })
  @IsUUID(4, { message: 'Token is not valid' })
  token: string

  @IsString({ message: 'Password must be a string' })
  password: string
}
