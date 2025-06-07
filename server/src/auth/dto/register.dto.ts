import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ name: 'MatchPasswords', async: false })
class MatchPasswordsConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const { password } = args.object as any
    return confirmPassword === password
  }

  defaultMessage() {
    return 'Passwords do not match'
  }
}

export class RegisterDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email is not valid' })
  email: string

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(32, { message: 'Password must be at most 32 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/, {
    message:
      'Password must include upper case, lower case, number, and special character'
  })
  password: string

  @IsNotEmpty({ message: 'Password confirmation is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(32, { message: 'Password must be at most 32 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/, {
    message:
      'Password must include upper case, lower case, number, and special character'
  })
  @Validate(MatchPasswordsConstraint)
  confirmPassword: string
}
