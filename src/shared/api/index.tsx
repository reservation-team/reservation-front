export interface Request {
  endpoint: string
  method: string
  query?: Record<string, string>
}

export async function internalFetch(request: Request) {
  const url = `/api${request.endpoint}${request.query ? '?' + new URLSearchParams(request.query).toString() : ''}`
  const response = await fetch(url, { method: request.method })
  const payload = await response.json()
  if (response.ok) return payload
  throw response
}

export const getRestaraunts = async () => {
  return await internalFetch({ endpoint: '/restaurants', method: 'GET' })
}

export const getTables = async (date: string) => {
  return await internalFetch({ endpoint: `/tables`, method: 'GET', query: { date } })
}
