import * as serverCrypto from 'crypto'
import type { FetchResponse } from 'ofetch'
import { isNull, isString } from 'lodash-es'
import type { NitroFetchRequest } from 'nitropack'

type FetchRawParameters<T = unknown, R extends NitroFetchRequest = NitroFetchRequest> = Parameters<(typeof $fetch<T, R>)['raw']>

type AppFetchResponse<T> = {
    _data: FetchResponse<T>['_data']
    headers: Record<string, string>
    status: FetchResponse<T>['status']
    statusText: FetchResponse<T>['statusText']
}

export const calculateSHA256Hash = async (text: string): Promise<string> => {
  if (process.server) {
    return serverCrypto.createHash('sha256').update(text).digest('base64')
  }
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const buffer = await crypto.subtle.digest('SHA-256', data)
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))
  return base64
}

function convert<T> (response: FetchResponse<T>): AppFetchResponse<T> {
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

export default defineNuxtPlugin(() => {
  const app = useNuxtApp()

  const baseFetch = $fetch.create({
    baseURL: 'http://localhost:3001'
  })

  const restClient = async <T = object>(request: FetchRawParameters<T>[0], options?: FetchRawParameters<T>[1]): Promise<AppFetchResponse<T>> => {
    if (options?.isCache) {
      const requestUrl = isString(request) ? request : request.url
      const hash = await calculateSHA256Hash(requestUrl)
      const key = hash.slice(0, 10)

      return app.runWithContext(async () => {
        const cached = useState<AppFetchResponse<T> | null>(key, () => {
          return null
        })

        if (isNull(cached.value)) {
          console.log('キャッシュに値が存在しません')
          const response = await baseFetch.raw<T>(request, {
            ...options
          })
          cached.value = convert(response)
        } else {
          console.log(`キャッシュ値を使用: ${key}`)
        }

        return cached.value
      })
    }

    const response = await baseFetch.raw<T>(request, {
      ...options
    })
    return convert(response)
  }

  return {
    provide: {
      restClient
    }
  }
})
