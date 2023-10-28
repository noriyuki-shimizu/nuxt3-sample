import type { AppFetchResponse, FetchResponse } from 'ofetch'

export function convert<T> (response: FetchResponse<T>): AppFetchResponse<T> {
  const headers: Record<string, string> = {}
  for (const [key, value] of response.headers.entries()) {
    Object.assign(headers, { [key]: value })
  }
  return {
    _data: response._data,
    headers,
    status: response.status,
    statusText: response.statusText
  }
}
