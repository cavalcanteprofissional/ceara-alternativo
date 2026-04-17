import { NextRequest, NextResponse } from 'next/server'
import { ipRateLimit } from './ip-rate-limit'

export async function withRateLimit(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  const rateLimitResult = await ipRateLimit(req)

  if (rateLimitResult) {
    return rateLimitResult
  }

  return handler(req)
}