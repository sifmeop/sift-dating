import { redirect } from 'next/navigation'
import { ROUTES } from '~/shared/constants'

export default function Home() {
  return redirect(ROUTES.LOGIN)
}
