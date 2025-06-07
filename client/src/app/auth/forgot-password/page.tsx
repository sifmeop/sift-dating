import { Metadata } from 'next'
import { ForgotPasswordPage } from '~/shared/components/pages/forgot-password'

export const metadata: Metadata = {
  title: '',
  description: ''
}

export default function ForgotPassword() {
  return <ForgotPasswordPage />
}
