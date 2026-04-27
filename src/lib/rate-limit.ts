import { NextRequest, NextResponse } from 'next/server'

const inMemoryMap = new Map<string, { count: number; resetTime: number }>()

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

  const clientData = inMemoryMap.get(clientId)

  if (!clientData || now > clientData.resetTime) {
    inMemoryMap.set(clientId, { count: 1, resetTime: now + WINDOW_SIZE })
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

let redis: import('@upstash/redis').Redis | null = null
let apiRateLimit: import('@upstash/ratelimit').Ratelimit | null = null
let authRateLimit: import('@upstash/ratelimit').Ratelimit | null = null

function initUpstashRedis() {
  if (redis || apiRateLimit || authRateLimit) return

  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    console.log('[RateLimit] Upstash Redis not configured, using in-memory rate limiting')
    return
  }

  try {
    const { Redis } = require('@upstash/redis')
    const { Ratelimit } = require('@upstash/ratelimit')

    redis = new Redis({ url, token })

    apiRateLimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, '10 s'),
      prefix: 'ratelimit:api',
    })

    authRateLimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '60 s'),
      prefix: 'ratelimit:auth',
    })

    console.log('[RateLimit] Upstash Redis enabled')
  } catch (error) {
    console.error('[RateLimit] Failed to initialize Upstash Redis:', error)
  }
}

export async function checkRateLimit(
  req: NextRequest,
  type: 'api' | 'auth' = 'api'
): Promise<NextResponse | null> {
  initUpstashRedis()

  if (type === 'auth' && authRateLimit) {
    const clientId = getClientId(req)
    const { success, remaining, reset, limit } = await authRateLimit.limit(clientId)

    if (!success) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Too many attempts. Please try again later.',
          retryAfter: reset
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        }
      )
    }
    return null
  }

  if (apiRateLimit) {
    const clientId = getClientId(req)
    const { success, remaining, reset, limit } = await apiRateLimit.limit(clientId)

    if (!success) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        }
      )
    }
    return null
  }

  return ipRateLimit(req)
}