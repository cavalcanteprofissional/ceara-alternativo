import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

export const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '10s'),
  prefix: 'ratelimit:api',
})

export const authRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '60s'),
  prefix: 'ratelimit:auth',
})