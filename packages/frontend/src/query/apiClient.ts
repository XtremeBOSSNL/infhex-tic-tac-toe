import { getOrCreateDeviceId } from '../deviceId'

let cachedDeviceId: string | null = null

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export function getApiBaseUrl() {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL
  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, '')
  }

  if (typeof window !== 'undefined') {
    return import.meta.env.DEV ? 'http://localhost:3001' : window.location.origin
  }

  return 'http://localhost:3001'
}

export function getSocketUrl() {
  return import.meta.env.VITE_SOCKET_URL ?? getApiBaseUrl()
}

export function getDeviceId() {
  if (cachedDeviceId) {
    return cachedDeviceId
  }

  cachedDeviceId = getOrCreateDeviceId()
  return cachedDeviceId
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const deviceId = getDeviceId()
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    credentials: 'include',
    ...init,
    headers: {
      'X-Device-Id': deviceId,
      ...init?.headers
    }
  })

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new ApiError(response.status, data?.error ?? `Request failed: ${response.status}`)
  }

  return await response.json() as T
}

export async function fetchOptionalJson<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    return await fetchJson<T>(path, init)
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null
    }

    throw error
  }
}
