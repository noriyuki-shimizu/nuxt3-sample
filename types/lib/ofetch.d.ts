import type { FetchResponse } from 'ofetch'

declare module 'ofetch' {
    type AppFetchResponse<T> = {
        _data: FetchResponse<T>['_data']
        headers: Record<string, string>
        status: FetchResponse<T>['status']
        statusText: FetchResponse<T>['statusText']
    }
}