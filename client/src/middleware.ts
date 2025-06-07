import { NextRequest, NextResponse } from 'next/server'
import { ROUTES } from './shared/constants'

export default function middleware(request: NextRequest) {
  const { url, cookies } = request

  const session = cookies.get('session')?.value

  const isAuthPage = url.includes('/auth')

  if (isAuthPage) {
    if (session) {
      return NextResponse.redirect(new URL(ROUTES.CHATS, request.url))
    }

    return NextResponse.next()
  } else {
    if (!session) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url))
    }

    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/auth/:path*', '/app/:path*']
}
