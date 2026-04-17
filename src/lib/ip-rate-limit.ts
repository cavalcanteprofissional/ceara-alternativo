import { NextRequest, NextResponse } from 'next/server'

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const WINDOW_SIZE = 60 * 1000
const MAX_REQUESTS = 100

function getClientId(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
  return ip
}

export async function ipRateLimit(req: NextRequest) {
  const clientId = getClientId(req)
  const now = Date.now()

  const clientData = rateLimitMap.get(clientId)

  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(clientId, { count: 1, resetTime: now + WINDOW_SIZE })
    return null
  }

  if (clientData.count >= MAX_REQUESTS) {
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil((clientData.resetTime - now) / 1000).toString(),
        },
      }
    )
  }

  clientData.count++
  return null
}