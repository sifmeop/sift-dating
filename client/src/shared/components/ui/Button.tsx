import { ButtonProps, Button as HeroButton } from '@heroui/react'

export const Button = (props: ButtonProps) => {
  return <HeroButton radius='sm' variant='flat' color='primary' {...props} />
}
