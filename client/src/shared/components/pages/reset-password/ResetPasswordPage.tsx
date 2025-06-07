import { ResetPasswordForm } from '~/features/auth/components'

interface ResetPasswordFormProps {
  token: string
}

export const ResetPasswordPage = ({ token }: ResetPasswordFormProps) => {
  return <ResetPasswordForm token={token} />
}
