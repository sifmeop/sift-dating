import { Input as HeroInput, InputProps } from '@heroui/react'

export const Input = (props: InputProps) => {
  return (
    <HeroInput
      radius='sm'
      variant='bordered'
      classNames={{
        inputWrapper: 'border'
      }}
      {...props}
    />
  )
}
