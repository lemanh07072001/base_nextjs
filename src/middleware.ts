import {NextResponse} from 'next/server'
import {getToken} from 'next-auth/jwt'
import createMiddleware from 'next-intl/middleware'
import {routing} from '@/i18n/routing'

// ✅ Middleware i18n (xử lý locale)
const intlMiddleware = createMiddleware(routing)

// ✅ Các route yêu cầu đăng nhập
const protectedRoutes = ['/dashboard', '/account', '/settings']

// ✅ Các route không cho phép truy cập khi đã login
const authRoutes = ['/login', '/register']

export default async function middleware(req: any) {
  const token = await getToken({req, secret: process.env.NEXTAUTH_SECRET})
  const {pathname} = req.nextUrl

  // Lấy locale hiện tại (ví dụ /vi/dashboard -> vi)
  const locale = pathname.split('/')[1]
  const pathWithoutLocale = '/' + pathname.split('/').slice(2).join('/')

  // 🔒 Nếu chưa login và truy cập trang private → chuyển về /{locale}/login
  if (protectedRoutes.some((path) => pathWithoutLocale.startsWith(path)) && !token) {
    const loginUrl = new URL(`/${locale}/login`, req.url)
    return NextResponse.redirect(loginUrl)
  }

  // 🚫 Nếu đã login mà cố vào /login → chuyển về /{locale}/dashboard
  if (authRoutes.some((path) => pathWithoutLocale.startsWith(path)) && token) {
    const dashboardUrl = new URL(`/${locale}/dashboard`, req.url)
    return NextResponse.redirect(dashboardUrl)
  }

  // ✅ Nếu không thuộc 2 trường hợp trên → tiếp tục xử lý i18n
  return intlMiddleware(req)
}

// ⚙️ Cấu hình matcher cho toàn bộ trang (trừ các route đặc biệt)
export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
}
