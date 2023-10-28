import type { AppFetchResponse } from 'ofetch'
import { isNull, isString } from 'lodash-es'
import type { FetchRawParameters } from 'nitropack'
import { convert } from './utils'

export default defineNuxtPlugin(() => {
  const app = useNuxtApp()

  const baseFetch = $fetch.create({
    baseURL: 'http://localhost:3001'
  })

  const restClient = async <T = object>(request: FetchRawParameters<T>[0], options?: FetchRawParameters<T>[1]): Promise<AppFetchResponse<T>> => {
    if (options?.isCache) {
      const requestUrl = isString(request) ? request : request.url
      const hash = await CryptoUtil.calculateSHA256Hash(requestUrl)
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
