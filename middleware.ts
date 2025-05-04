import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname

  // Special handling for /products/accessories
  if (pathname === "/products/accessories") {
    // Make sure this is handled by the dedicated page
    return NextResponse.next()
  }

  // Continue with the default behavior for all other routes
  return NextResponse.next()
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: ["/products/:path*"],
}
