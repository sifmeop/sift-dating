import { InputProps } from '@heroui/react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useToggle } from 'usehooks-ts'
import { Input } from './Input'

export const PasswordInput = (props: InputProps) => {
  const [isVisible, toggle] = useToggle()

  const Icon = isVisible ? AiOutlineEyeInvisible : AiOutlineEye

  return (
    <Input
      {...props}
      type={isVisible ? 'text' : 'password'}
      endContent={
        <button type='button' className='cursor-pointer' onClick={toggle}>
          <Icon size={24} />
        </button>
      }
    />
  )
}
