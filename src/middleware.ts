import { NextResponse } from 'next/server'

export function middleware() {
  // Remove or modify authentication checks
  return NextResponse.next()
}

// Optional: If you want to protect only specific routes
export const config = {
  matcher: [] // Empty array means no routes are protected
} 