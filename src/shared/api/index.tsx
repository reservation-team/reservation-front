export interface Request {
  endpoint: string
  method: string
  query?: Record<string, string>
  body?: any
}

export async function internalFetch(request: Request) {
  const url = `/api${request.endpoint}${request.query ? '?' + new URLSearchParams(request.query).toString() : ''}`
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: request.method,
    body: request.body ? JSON.stringify(request.body) : null,
  })
  const possibleEmptyResponse = await response.text()
  const payload = possibleEmptyResponse.length ? JSON.parse(possibleEmptyResponse) : {}
  if (response.ok) return payload
  throw response
}

export const getRestaraunts = async () => {
  return await internalFetch({ endpoint: '/restaurants', method: 'GET' })
}

export const getTables = async (date: string) => {
  return await internalFetch({ endpoint: `/tables`, method: 'GET', query: { date } })
}

export const addReservation = async (data: any) => {
  return await internalFetch({ endpoint: `/reservations`, method: 'POST', body: data })
}

export const updateReservation = async ({ id, data }: { id: number; data: any }) => {
  return await internalFetch({ endpoint: `/reservations/${id}`, method: 'PUT', body: data })
}

export const removeReservation = async (id: number) => {
  return await internalFetch({ endpoint: `/reservations/${id}`, method: 'DELETE' })
}

export const addTable = async (data: any) => {
  return await internalFetch({ endpoint: `/tables`, method: 'POST', body: data })
}

export const updateTable = async ({ id, data }: { id: number; data: any }) => {
  return await internalFetch({ endpoint: `/tables/${id}`, method: 'PUT', body: data })
}

export const removeTable = async (id: number) => {
  return await internalFetch({ endpoint: `/tables/${id}`, method: 'DELETE' })
}

export const updateRestaraunt = async (data: any) => {
  return await internalFetch({ endpoint: `/restaurants/1`, method: 'PUT', body: data })
}
