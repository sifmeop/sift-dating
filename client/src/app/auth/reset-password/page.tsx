import { redirect } from 'next/navigation'
import { ResetPasswordPage } from '~/shared/components/pages/reset-password'
import { ROUTES } from '~/shared/constants'

interface ResetPasswordProps {
  searchParams: Promise<{ [key: string]: unknown }>
}

export default async function ResetPassword({ searchParams }: ResetPasswordProps) {
  const token = (await searchParams).token

  if (!token || typeof token !== 'string') {
    return redirect(ROUTES.LOGIN)
  }

  return <ResetPasswordPage token={token} />
}
