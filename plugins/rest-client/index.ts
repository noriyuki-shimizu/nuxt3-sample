import { StorageSerializers, useSessionStorage } from '@vueuse/core';
import type { FetchResponse } from 'ofetch'
import { hash as ohash } from "ohash";
import { isNull } from 'lodash-es';
import type { NitroFetchRequest } from 'nitropack'

type FetchRawParameters<T = unknown, R extends NitroFetchRequest = NitroFetchRequest> = Parameters<(typeof $fetch<T, R>)['raw']>

type AppFetchResponse<T> = {
    _data: FetchResponse<T>['_data']
    headers: FetchResponse<T>['headers']
    status: FetchResponse<T>['status']
    statusText: FetchResponse<T>['statusText']
}

function convert<T>(response: FetchResponse<T>): AppFetchResponse<T> {
    return {
        _data: response._data,
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
    }
}

export default defineNuxtPlugin(() => {
    const baseFetch = $fetch.create({
        baseURL: 'http://localhost:3001'
    })

    const restClient = async <T = object>(request: FetchRawParameters<T>[0], options?: FetchRawParameters<T>[1]): Promise<AppFetchResponse<T>> => {
        if (options?.isCache) {
            const hash = ohash(request);
            const cached = useSessionStorage<AppFetchResponse<T>>(hash, null, {
                serializer: StorageSerializers.object
            })

            if (isNull(cached.value)) {
                const response = await baseFetch.raw<T>(request, {
                    ...options,
                })
                cached.value = convert(response)
            }

            return cached.value
        }

        const response = await baseFetch.raw<T>(request, {
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
