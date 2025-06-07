import { Metadata } from 'next'
import { LoginPage } from '~/shared/components/pages/login'

export const metadata: Metadata = {
  title: '',
  description: ''
}

export default function Login() {
  return <LoginPage />
}
