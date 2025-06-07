import { Metadata } from 'next'
import { RegisterPage } from '~/shared/components/pages/register'

export const metadata: Metadata = {
  title: '',
  description: ''
}

export default function Register() {
  return <RegisterPage />
}
