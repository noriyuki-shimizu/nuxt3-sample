import { StorageSerializers, useSessionStorage } from '@vueuse/core';
import type { FetchResponse } from 'ofetch'

type AppFetchResponse<T> = {
    _data: FetchResponse<T>['_data']
    headers: FetchResponse<T>['headers']
    ok: FetchResponse<T>['ok']
    redirected: FetchResponse<T>['redirected']
    status: FetchResponse<T>['status']
    statusText: FetchResponse<T>['statusText']
    type: FetchResponse<T>['type']
    url: FetchResponse<T>['url']
}

function convert<T>(response: FetchResponse<T>) {
    return {
        _data: response._data,
        headers: response.headers,
        ok: response.ok,
        redirected: response.redirected,
        status: response.status,
        statusText: response.statusText,
        type: response.type,
        url: response.url,
    }
}

export default defineNuxtPlugin(() => {
    const baseFetch = $fetch.create({
        baseURL: 'http://localhost:3001'
    })

    const restClient = async <T = object>(
        request: Parameters<(typeof $fetch<T>)['raw']>[0],
        options?: Parameters<(typeof $fetch<T>)['raw']>[1],
        customOptions?: { cache: boolean }
      ): Promise<AppFetchResponse<T>> => {
        if (customOptions?.cache) {
            // Use sessionStorage to cache data
            const cached = useSessionStorage<AppFetchResponse<T>>(request as string, null, {
                serializer: StorageSerializers.object,
            });
            console.log("cached.value: ", cached.value)
            if (!cached.value) {
                const response = await baseFetch.raw<T, Request | string>(request, {
                    ...options,
                })

                cached.value = convert(response)
            } else {
                console.log(`Getting value from cache for [${request}]`)
            }
            return cached.value
        }
        const response = await baseFetch.raw<T, Request | string>(request, {
            ...options,
        })
        return convert(response)
    }
    return {
        provide: {
            restClient
        }
    }
})
